export interface KakaoAddressMeta {
  total_count: number;
}

export interface KakaoAddressInfo {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  zip_code: string;
}

export interface KakaoAddressDocument {
  road_address: null;
  address: KakaoAddressInfo;
}

export interface KakaoAddressResponse {
  meta: KakaoAddressMeta;
  documents: KakaoAddressDocument[];
}
