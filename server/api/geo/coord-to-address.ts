import type { KakaoAddressResponse } from "~~/types/kakao-api";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { x, y } = query;

  if (!x || !y) {
    throw createError({
      statusCode: 400,
      message: "좌표 정보가 필요합니다",
    });
  }

  const config = useRuntimeConfig();

  try {
    const data = await $fetch<KakaoAddressResponse>(
      "https://dapi.kakao.com/v2/local/geo/coord2address.json",
      {
        params: {
          x,
          y,
        },
        headers: {
          Authorization: `KakaoAK ${config.kakaoApiKey}`,
        },
      }
    );

    if (data.documents[0]) {
      const addr = data.documents[0].address;
      return {
        address: `${addr.region_1depth_name} ${addr.region_2depth_name} ${addr.region_3depth_name}`,
      };
    }

    return {
      address: "주소를 찾을 수 없습니다",
    };
  } catch {
    throw createError({
      statusCode: 500,
      message: "주소 변환 실패",
    });
  }
});
