export interface AddressResponse {
  address: string;
}

export async function getAddressFromCoords(
  longitude: number,
  latitude: number
): Promise<AddressResponse> {
  try {
    return await $fetch<AddressResponse>("/api/geo/coord-to-address", {
      params: {
        x: longitude,
        y: latitude,
      },
    });
  } catch (error) {
    console.error("Geocoding API error:", error);
    throw createError({
      statusCode: 500,
      message: "주소 변환 실패",
    });
  }
}
