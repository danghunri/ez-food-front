import type { Pipeline } from "@huggingface/transformers";
import { useTransformers } from "./useTransformers";
import type {
  RecommendationInput,
  RecommendationResult,
} from "~/types/recommendation";

export function useMenuRecommendation() {
  const { isLoading, isInferencing, error, createPipeline, runInference } =
    useTransformers();

  const recommendationResult = ref<RecommendationResult | null>(null);
  const model = shallowRef<Pipeline | null>(null);

  // 모델 초기화
  const initModel = async () => {
    if (!model.value) {
      try {
        // text-generation 모델 사용 (필요에 따라 다른 모델 사용 가능)
        // 'Xenova/distilgpt2'는 예시입니다. 메뉴 추천에 특화된 모델로 변경 가능
        model.value = await createPipeline(
          "text-generation",
          "Xenova/distilgpt2"
        );
      } catch (err) {
        console.error("메뉴 추천 모델 초기화 실패:", err);
        throw err;
      }
    }
    return model.value;
  };

  // 텍스트 프롬프트로 메뉴 추천
  const getRecommendationFromText = async (prompt: string) => {
    try {
      // 모델이 초기화되지 않았을 경우에만 초기화
      const pipeline = model.value || (await initModel());

      // 메뉴 추천을 위한 프롬프트 구성
      const fullPrompt = `다음 조건에 맞는 식당과 메뉴를 추천해주세요. JSON 형식으로 응답해주세요. 조건: ${prompt}`;

      // 추론 실행
      const rawResult = await runInference(pipeline!, fullPrompt);

      // 결과 파싱 및 가공
      const result = parseRecommendationResult(rawResult);
      recommendationResult.value = result;

      return result;
    } catch (err) {
      console.error("메뉴 추천 실패:", err);
      throw err;
    }
  };

  // 구조화된 데이터로 메뉴 추천
  const getRecommendationFromData = async (input: RecommendationInput) => {
    try {
      // 모델이 초기화되지 않았을 경우에만 초기화
      const pipeline = model.value || (await initModel());

      // 입력 데이터를 프롬프트로 변환
      const prompt = buildPromptFromData(input);

      // 추론 실행
      const rawResult = await runInference(pipeline!, prompt);

      // 결과 파싱 및 가공
      const result = parseRecommendationResult(rawResult);
      recommendationResult.value = result;

      return result;
    } catch (err) {
      console.error("메뉴 추천 실패:", err);
      throw err;
    }
  };

  // 입력 데이터를 프롬프트로 변환하는 함수
  const buildPromptFromData = (input: RecommendationInput): string => {
    let prompt =
      "다음 조건에 맞는 식당과 메뉴를 추천해주세요. JSON 형식으로 응답해주세요.\n";

    // 각 필드에 대한 프롬프트 구성
    if (input.foodType) {
      prompt += `음식 종류: ${input.foodType}\n`;
    }
    if (input.serviceType) {
      prompt += `서비스 유형: ${input.serviceType}\n`;
    }
    if (input.mealTime) {
      prompt += `식사 시간: ${input.mealTime}\n`;
    }
    if (input.purpose) {
      prompt += `목적: ${input.purpose}\n`;
    }
    if (input.weather) {
      prompt += `날짜: ${input.date}\n`;
    }
    if (input.weather) {
      prompt += `날씨: ${input.weather}\n`;
    }
    if (input.temperature !== undefined) {
      prompt += `온도: ${input.temperature}°C\n`;
    }
    if (input.location) {
      prompt += `위치: ${input.location}\n`;
    }

    prompt += "\n응답 형식은 다음과 같이 JSON 형식이어야 합니다:\n";
    prompt += `{
  "reason": "추천 이유에 대한 설명",
  "recommendations": [
    { "name": "메뉴1", "description": "메뉴 설명" },
    { "name": "메뉴2", "description": "메뉴 설명" },
    { "name": "메뉴3", "description": "메뉴 설명" }
  ]
}`;

    return prompt;
  };

  // 모델 결과를 파싱하는 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseRecommendationResult = (rawResult: any): RecommendationResult => {
    try {
      // 모델에 따라 결과 형식이 다를 수 있으므로 적절히 파싱
      let resultText = "";

      if (Array.isArray(rawResult) && rawResult.length > 0) {
        if (typeof rawResult[0] === "object" && rawResult[0].generated_text) {
          resultText = rawResult[0].generated_text;
        } else {
          resultText = String(rawResult[0]);
        }
      } else if (typeof rawResult === "string") {
        resultText = rawResult;
      } else if (typeof rawResult === "object") {
        return rawResult as RecommendationResult;
      }

      // JSON 형식 추출 시도
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            reason: parsed.reason || "입력 조건에 맞는 메뉴를 추천했습니다.",
            recommendations: parsed.recommendations || [],
          };
        } catch (e) {
          console.warn("JSON 파싱 실패, 대체 결과 반환", e);
        }
      }

      // 파싱 실패 시 기본 응답
      return {
        reason: "입력 조건에 맞는 메뉴를 추천했습니다.",
        recommendations: [
          {
            name: "파싱 실패로 추천을 제공할 수 없습니다",
            description: "다시 시도해주세요",
          },
        ],
      };
    } catch (err) {
      console.error("결과 파싱 오류:", err);
      return {
        reason: "결과 처리 중 오류가 발생했습니다.",
        recommendations: [
          { name: "오류 발생", description: "다시 시도해주세요" },
        ],
      };
    }
  };

  return {
    isLoading,
    isInferencing,
    error,
    recommendationResult,
    getRecommendationFromText,
    getRecommendationFromData,
    initModel,
  };
}
