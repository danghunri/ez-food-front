import type { Pipeline, PipelineType } from "@huggingface/transformers";

export function useTransformers() {
  // 상태 관리
  const isLoading = ref(false);
  const isInferencing = ref(false);
  const error = ref<string | null>(null);

  // 모델 캐싱
  const modelCache = new Map();

  // 모델 파이프라인 생성 함수
  const createPipeline = async (task: PipelineType, model?: string) => {
    if (typeof window === "undefined") return null;

    isLoading.value = true;

    try {
      const cacheKey = `${task}-${model || "default"}`;

      // 캐시된 모델이 있으면 재사용
      if (modelCache.has(cacheKey)) {
        isLoading.value = false;
        return modelCache.get(cacheKey);
      }

      // 모듈 동적 가져오기
      const { pipeline } = await import("@huggingface/transformers");

      // 모델 로드
      const pipe = model
        ? await pipeline(task, model, { device: "webgpu", dtype: "q8" })
        : await pipeline(task, undefined, { device: "webgpu", dtype: "q8" });
      // 캐시에 저장
      modelCache.set(cacheKey, pipe);
      isLoading.value = false;

      return pipe;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err?.message : "Unknown error occurred";
      isLoading.value = false;
      throw err;
    }
  };

  // 추론 실행 래퍼 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runInference = async (pipe: Pipeline, input: any) => {
    if (!pipe) {
      throw new Error("Model pipeline not initialized");
    }

    isInferencing.value = true;
    isLoading.value = true;

    try {
      const result = await pipe(input);

      isInferencing.value = false;
      isLoading.value = false;

      return result;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err?.message : "Inference failed";
      isInferencing.value = false;
      isLoading.value = false;
      throw err;
    }
  };

  return {
    isLoading,
    isInferencing,
    error,
    createPipeline,
    runInference,
  };
}
