import { BedType } from "../types/room";

/** 1월부터 12월까지  */
export const monthList = [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ];

/** 1부터 31까지 */
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

/** 2022년부터 1900까지  */
export const yearList = Array.from(Array(123), (_, i) => String(2022 - i));


/** 숙소 큰 범위의 건물 유형 */
export const largeBuildingTypeList = [
    {
        type : '아파트',
        imgSrc: '/static/image/building/apartment.webp'
    },
    {
        type : '주택',
        imgSrc: '/static/image/building/houst.webp'
    },
    {
        type : '별채',
        imgSrc: '/static/image/building/secondary.webp'
    },
    {
        type : '독특한 숙소',
        imgSrc: '/static/image/building/uniqueSpace.webp'
    },
    {
        type : 'B&B',
        imgSrc: '/static/image/building/bnb.webp'
    },
    {
        type : '부티크호텔',
        imgSrc: '/static/image/building/boutiquesHotel.webp'
    }
];

// 아파트 건물 유형
export const apartmentBuildingTpyeList = [
    {
        type: '공동 주택',
        description: '다세대 건물 또는 단지 내의 임대 공간입니다.'
    },
    {
        type: '콘도',
        description: '거주가 소유의 다세대 건물 또는 단지 내의 공간을 의미합니다.'
    },
    {
        type: '로프트',
        description: '개방적인 구조의 아파트나 콘도로 내부가 낮은 벽으로 마감되었을 수 있습니다.'
    },
    {
        type: '레지던스',
        description: '전문 관리업체가 운영하는 아파트로, 호텔 같은 편의 시설을 갖추고 있습니다.'
    },
    {
        type: '카사 파르티쿨라르',
        description: 'B&B와 비슷한 쿠바 숙소로, 호스트가 거주하는 집 안 개인실을 의미합니다.'
    },
    {
        type: '휴가용 주택',
        description: '주방과 욕식이 있고, 가구가 완비된 임대 숙소로, 리셉션 데스크와 같은 일부 서비스를 게스트에게 제공할 수 있습니다.'
    }
];

// 주택 건물 유형
export const houstBuildingTypeList = [
    {
        type: '집',
        description: '단독 또는 연립주택입니다.'
    },
    {
        type: '통나무집',
        description: '목재 등의 천연 재료로 자연 속에 지은 집입니다.'
    },
    {
        type: '저택',
        description: '널찍한 실내와 공간, 정원, 수영장 등을 갖춘 고급 주택입니다.'
    },
    {
        type: '타운하우스',
        description: '여러 층으로 된 연립주택으로 옆 세대의 건물과 붙어 있으며 야외 공간을 공유하기도 합니다.'
    },
    {
        type: '전원 주택',
        description: '시골이나 호숫가, 해변가에 지어진 아담한 주택입니다.'
    },
    {
        type: '방갈로',
        description: '넓은 현관과 박공 지붕을 갖춘 단층 주택입니다.'
    },
    {
        type: '복토 주택',
        description: '땅속에 짓거나 흙 등의 재료로 만든 집을 말합니다.'
    },
    {
        type: '하우스보트',
        description: '육상 주택과 비슷한 자재로 건축된 수상 가옥입니다.'
    },
    {
        type: '오두막',
        description: '짚을 엮어 만든 지붕처럼 나무나 진흙을 재료로 만든 집을 말합니다.'
    },
    {
        type: '농장 체험 숙소',
        description: '게스트가 농사를 짓는 환경 속에서 또는 동물들과 함께 지낼 수 있는 농촌 숙소입니다.'
    },
    {
        type: '돔하우스',
        description: '지붕이 돔 형태로 되어 있거나 전체가 완전히 구 형태로 이루어진 집입니다.'
    },
    {
        type: '키클라데스 주택',
        description: '그리스 키클라데스 섬에서 볼 수 있는 새하얀 가옥으로, 평평한 지붕을 갖추고 있습니다.'
    },
    {
        type: '샬레',
        description: '스키 또는 여름 휴가용으로 인기 있으며 박공 지붕을 갖춘 목조 주택을 의미합니다.'
    },
    {
        type: '담무소',
        description: '판텔레리아 섬에 있는 돌로 만든 주택으로, 돔 지붕을 갖추고 있습니다.'
    },
    {
        type: '등대',
        description: '배를 안내하기 위해 사방으로 밝은 빛을 비추는 수변 탑을 의미합니다.'
    },
    {
        type: '마차',
        description: '양치기가 양을 몰면서 주거용으로 사용한 작은 화차를 의미합니다.'
    },
    {
        type: '초소형 주택',
        description: '37제곱미터(400제곱피트) 이하의 단독 주택을 말합니다.'
    },
    {
        type: '트룰로',
        description: '이탈리아에서 유래된 둥근 형태의 석조 주택으로, 원뿔 모양의 지붕을 하고 있습니다.'
    },
    {
        type: '카사 파르티쿨라르',
        description: 'B&B와 비슷한 쿠바 숙소로, 호스트가 거주하는 집 안 개인실을 의미합니다.'
    },
    {
        type: '펜션',
        description: '한국 시골에 자리한 숙소로 바비큐 시설과 공용 공간을 갖추고 있습니다.'
    },
    {
        type: '휴가용 주택',
        description: '주방과 욕실이 있고, 가구가 완비된 임대 숙소로, 리셉션 데스크와 같은 일부 서비스를 게스트에게 제공할 수 있습니다.'
    }
];

// 별채 건물 유형
export const secondaryUnitBuildingTypeList = [
    {
        type: '게스트용 별채',
        description: '본채와 떨어진 별도의 건물입니다.'
    },
    {
        type: '게스트 스위트',
        description: '더 큰 구조물의 안에 있거나 나란히 붙어 있는 별도의 공간으로 전용 출입구를 갖추고 있습니다.'
    },
    {
        type: '농장 체험 숙소',
        description: '게스트가 농사를 짓는 환경 속에서 또는 동물들과 함께 지낼 수 있는 농촌 숙소입니다.'
    },
    {
        type: '휴가용 주택',
        description: '주방과 욕실이 있고, 가구가 완비된 임대 숙소로, 리셉션 데스크와 같은 일부 서비스를 게스트에게 제공할 수 있습니다.'
    },
]

// 독특한 숙소 건물 유형
export const uniqueSpaceBuildingTypeList = [
    {
        type: '헛간',
        description: '곡물, 가축, 농기구를 상시 저장하는 곳에서 주거용으로 개조된 공간을 말합니다.'
    },
    {
        type: '보트',
        description: '숙박 기간 동안 정박 중인 배, 보트, 요트로, 하우스보트와는 다릅니다.'
    },
    {
        type: '버스',
        description: '내부를 독창적으로 개조한 다인승 차량입니다.'
    },
    {
        type: '캠핑카',
        description: '집과 차량의 중간 형태를 띤 주거용 차량이나 캠핑 트레일러를 말합니다.'
    },
    {
        type: '트리하우스',
        description: '나무 몸통이나 가지 또는 나무 주변 기둥에 기어진 구조물입니다.'
    },
    {
        type: '캠핑장',
        description: '게스트가 텐트, 유르트, 캠핑카, 초소형 주택 등을 직접 세울 수 있는 땅을 의미합니다.'
    },
    {
        type: '성',
        description: '탑이나 호가 딸린 웅장하고 유서 깊은 건물입니다.'
    },
    {
        type: '동굴',
        description: '언덕이나 절벽에 자연적 또는 인공적으로 형성된 곳에 마련된 거주 공간입니다.'
    },
    {
        type: '돔하우스',
        description: '지붕이 돔 형태로 되어 있거나 전체가 완전히 구 형태로 이루어진 집입니다.'
    },
    {
        type: '복토 주택',
        description: '땅속에 짓거나 흙 등의 재료로 만든 집을 말합니다.'
    },
    {
        type: '농장 체험 숙소',
        description: '게스트가 농사를 짓는 환경 속에서 또는 동물들과 함께 지낼 수 있는 농촌 숙소입니다.'
    },
    {
        type: '야영장',
        description: '호주나 뉴질랜드의 넓은 부지로, 캠핑장이나 통나무집 등의 숙소를 제공합니다.'
    },
    {
        type: '하우스보트',
        description: '육상 주택과 비슷한 자재로 건축된 수상 가옥입니다.'
    },
    {
        type: '오두막',
        description: '짚을 엮어 만든 지붕처럼 나무나 진흙을 재료로 만든 집을 말합니다.'
    },
    {
        type: '아이스 돔',
        description: '눈과 얼음으로 만든 돔 형태의 구조물로, 추운 지역에 위치합니다.'
    },
    {
        type: '섬',
        description: '사방이 물로 둘러싸인 땅을 말합니다.'
    },
    {
        type: '등대',
        description: '배를 안내하기 위해 사방으로 밝은 빛을 비추는 수변 탑을 의미합니다.'
    },
    {
        type: '비행기',
        description: '숙박용으로 개조된 항공기입니다.'
    },
    {
        type: '목장',
        description: '가축을 기르는 용도의 넓은 부지에 세워진 주택을 말합니다.'
    },
    {
        type: '종교 건물',
        description: '교회나 모스크 같은 옛 예배 장소를 주거용으로 개조한 건물을 지칭합니다.'
    },
    {
        type: '마차',
        description: '양치기가 양을 몰면서 주거용으로 사용한 작은 화차를 의미합니다.'
    },
    {
        type: '컨테이너 하우스',
        description: '화물 운송용 철제 컨테이너를 개조한 공간입니다.'
    },
    {
        type: '텐트',
        description: '일반적으로 천과 막대로 세우는 구조물입니다.'
    },
    {
        type: '초소형 주택',
        description: '37제곱미터(400제곱피트) 이하의 단독 주택을 말합니다.'
    },
    {
        type: '타피',
        description: '막대기로 세우는 원뿔 모양의 텐트로, 위쪽은 열려 있고 문에는 지퍼가 달려 있습니다.'
    },
    {
        type: '타워',
        description: '주변 지역 전망을 즐길 수 있는 자립구조물입니다.'
    },
    {
        type: '기차',
        description: '주거용으로 개조된 승무원실, 화물 차량 또는 기타 철도 차량 말합니다.'
    },
    {
        type: '풍차',
        description: '풍력 발전에 사용된 적이 있는 구조물을 주거용으로 개조한 공간입니다.'
    },
    {
        type: '유르트',
        description: '접이식 목제 프레임으로 만든 둥근 텐트입니다.'
    },
    {
        type: '리아드',
        description: '야외 마당이나 정원 주변에 지어진 모로코 전통 주택입니다.'
    },
    {
        type: '펜션',
        description: '한국 시골에 자리한 숙소로 바비큐 시설과 공용 공간을 갖추고 있습니다.'
    },
    {
        type: '휴가용 주택',
        description: '주방과 욕실이 있고, 가구가 완비된 임대 숙소로, 리셉션 데스크와 같은 일부 서비스를 게스트에게 제공할 수 있습니다.'
    },
    {
        type: '기타',
    }
];

// B&B 건물 유형
export const bnbBuildingTypeList = [
    {
        type: 'B&B',
        description: '호스트가 상주하며 아침 식사를 제공하는 숙박업체입니다.'
    },
    {
        type: '산장',
        description: '숲이나 산 등 자연 가까이 자리한 숙박업체입니다.'
    },
    {
        type: '농장 체험 숙소',
        description: '게스트가 농사를 짓는 환경 속에서 또는 동물들과 함께 지낼 수 있는 농촌 숙소입니다.'
    },
    {
        type: '민수',
        description: '대만에서 개인실을 제공하는 숙박업체입니다.'
    },
    {
        type: '카사 파르티쿨라르',
        description: 'B&B와 비슷한 쿠바 숙소로, 호스트가 거주하는 집 안 개인실을 의미합니다.'
    },
    {
        type: '료칸',
        description: '독특한 일본 문화를 경험할 수 있는 작은 여관을 말합니다.'
    },
];

// 부티크 호텔 건물유형
export const boutiquesHotelBuildingTypeList = [
    {
        type: '호텔',
        description: '개인실, 스위트룸 또는 독특한 공간을 제공하는 숙박업체입니다.'
    },
    {
        type: '호스텔',
        description: '다인실이나 개인실을 제공하는 숙박업체입니다.'
    },
    {
        type: '리조트',
        description: '호텔보다 더 많은 편의시설과 서비스를 제공하는 숙박업체입니다.'
    },
    {
        type: '산장',
        description: '숲이나 산 등 자연 가까이 자리한 숙박업체입니다.'
    },
    {
        type: '부티크 호텔',
        description: '독특한 스타일이나 개성 있는 분위기의 테마로 꾸며진 숙박업체입니다.'
    },
    {
        type: '아파트 호텔',
        description: '호텔 같은 편의시설과 객실을 갖춘 공간으로, 아파트와 비슷합니다.'
    },
    {
        type: '레지던스',
        description: '전문 관리업체가 운영하는 아파트로, 호텔 같은 편의시설을 갖추고 있습니다.'
    },
    {
        type: '헤리티지 호텔',
        description: '숙박용으로 개조된 인도의 역사적인 건물입니다.'
    },
    {
        type: '객잔',
        description: '현지 감성과 세련된 편의시설을 갖춘 중국 숙소입니다.'
    }
]

// 숙소 유형
export const roomTypeList = [
    {
        label: '집 전체',
        value: 'entire',
        description: '게스트가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 일반적으로 침실, 욕실, 부엌이 포함됩니다.'
    },
    {
        label: '개인실',
        value: 'private',
        description: '게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수  있습니다.'
    },
    {
        label: '다인실',
        value: 'public',
        description: '게스트는 개인 공간 없이, 다른 사람과 함께 쓰는 침실이나 공용공간에서 숙박합니다.'
    }
];

// 침실 개수
export const bedroomCountList = Array.from(Array(16), (_, i) => `침실 ${i}개`);

// 침대 유형
export const bedTypes: BedType[] = [
    '소파',
    '에어 메트릭스',
    '요와 이불',
    '싱글',
    '더블',
    '퀸',
    '이층 침대',
    '바닥용 에어매트릭스',
    '유아 침대',
    '유아용 침대',
    '해먹',
    '물침대',
];

// 국가 리스트
export const countryList = ['대한민국', '일본', '중국'];

// 편의 시설
export const amentityList = [
    '무선 인터넷',
    'TV',
    '난방',
    '에어컨',
    '다리미',
    '샴푸',
    '헤어 드라이어',
    '조식, 커피, 차',
    '업무가능 공간/책상',
    '벽난로',
    '옷장/서랍장',
    '게스트 전용 출입문',
];

// 편의 공간
export const convenienceList = [
    '주방',
    '세탁 공간 - 세탁기',
    '주차',
    '헬스장',
    '수영장',
    '자쿠지',
];