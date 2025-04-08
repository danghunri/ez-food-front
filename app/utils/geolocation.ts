export interface Coordinates {
  lat: number;
  lon: number;
}

/**
 * 브라우저의 Geolocation API를 사용하여 현재 위치의 좌표를 가져옵니다.
 * @returns 위도(lat)와 경도(lon)를 포함한 좌표 객체
 */
export const getCurrentPosition = async (): Promise<Coordinates> => {
  if (!import.meta.client || !navigator.geolocation) {
    throw new Error("위치 정보가 지원되지 않습니다");
  }

  return new Promise<Coordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error("위치 정보를 가져올 수 없습니다: " + error.message));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};
