import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import { useRouter } from "next/router";
import shallow from "zustand/shallow";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import { countryList } from "../../../lib/staticData";
import { useRegisterRoomStore } from "../../../stores/useRegisterRoomStore";

import StageInfo from "./StageInfo";
import Footer from "./Footer";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 80px);
  .selector-wrapper {
    position: relative;
    flex: 1;
    height: 100%;
    .map-wrapper {
      position: relative;
      width: 100%;
      height: calc(100% - 80px);
      .input-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 45%;
        background-color: white;
        border-radius: 16px;
        padding: 32px 24px;
        z-index: 1;
        h1 {
          text-align: center;
          font-weight: bold;
          font-size: 20px;
        }
        ul {
          margin-top: 40px;
          border: 1px solid ${palette.gray_71};
          border-radius: 5px;
          li {
            position: relative;
            height: 60px;
            width: 100%;
            border-bottom: 1px solid ${palette.gray_71};
            &:focus-within,
            &.isValid {
              border-radius: 10px;
              p {
                top: 22%;
                font-size: 12px;
              }
            }
            p {
              position: absolute;
              top: 50%;
              left: 15px;
              transform: translateY(-50%);
              font-size: 16px;
              transition: all 0.2s;
              color: ${palette.gray_71};
            }
            input {
              padding: 0;
              margin: 0;
              width: calc(100%);
              height: 100%;
              border: 0;
              background-color: transparent;
              padding-left: 15px;
              padding-top: 10px;
              &:focus {
                outline: none;
                width: 100%;
              }
            }
            &:first-child {
              /* border: 0; */
              margin-top: -0.5px;
            }
            &:last-child {
              border: 0;
            }

            select {
              width: 100%;
              height: 100%;
              outline: none;
              border: 0;
              background-color: transparent;
              padding-left: 10px;
            }
          }
        }
        .currentAPI {
          margin-top: 30px;
          border-top: 1px solid ${palette.gray_dd};
          padding-top: 20px;
          h2 {
            font-size: 18px;
          }
          button {
            margin-top: 20px;
            border: 0;
            background-color: transparent;
            width: 150px;
            height: 40px;
            border: 2px solid ${palette.dark_cyan};
            border-radius: 5px;
            color: ${palette.dark_cyan};
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }

      .pin-location {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 350px;
        height: 50px;
        line-height: 50px;
        background-color: white;
        border-radius: 30px;
        box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.3);
        text-align: center;
        z-index: 1;
        span {
          margin-left: 10px;
          font-size: 12px;
          color: ${palette.dark_cyan};
          cursor: pointer;
        }
      }
    }
  }
`;

const Location: React.FC = () => {
  const router = useRouter();
  const {
    country: storedCountry,
    city: storedCity,
    district: storedDistrict,
    streetAddress: storedStreetAddress,
    detailAddress: storedDetailAddress,
    postcode: storedPostcode,
    latitude: storedLatitude,
    longitude: storedLongitude,
    setAddress,
  } = useRegisterRoomStore(
    (state) => ({
      country: state.country,
      city: state.city,
      district: state.district,
      streetAddress: state.streetAddress,
      detailAddress: state.detailAddress,
      postcode: state.postcode,
      latitude: state.latitude,
      longitude: state.longitude,
      setAddress: state.setAddress,
    }),
    shallow
  );

  const cityInputRef = useRef<HTMLInputElement>(null);
  const districtInputRef = useRef<HTMLInputElement>(null);
  const streetAddressInputRef = useRef<HTMLInputElement>(null);
  const detailAddressInputRef = useRef<HTMLInputElement>(null);
  const postcodeInputRef = useRef<HTMLInputElement>(null);

  const [isInputFinish, setIsInputFinish] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const [curCoords, setCurCoords] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  useLayoutEffect(() => {
    {!!storedCountry && setCountry(storedCountry);}
    {!!storedCity && setCity(storedCity);}
    {!!storedDistrict && setDistrict(storedDistrict);}
    {!!storedStreetAddress && setStreetAddress(storedStreetAddress);}
    {!!storedDetailAddress && setDetailAddress(storedDetailAddress);}
    {!!storedPostcode && setPostcode(storedPostcode);}
    {!!storedLatitude && !!storedLongitude &&
        setPosition({
          ...position,
          lat: storedLatitude,
          lng: storedLongitude,
        });
    }
  }, []);

  useLayoutEffect(() => {
    // ?????? ?????? ????????????
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurCoords({
        ...curCoords,
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);



  const onClickNextButton = () => {
    if (!!country && !!city && !!district && !!streetAddress && !!postcode) {
      setIsInputFinish(true);
    }
    if (isInputFinish) {
      if(!position) {
        alert("?????? ?????? ?????????.");
      } else {
        setAddress({
          country,
          city,
          district,
          streetAddress,
          detailAddress,
          postcode,
          latitude: position?.lat,
          longitude: position?.lng,
        });
        router.push('/room/register/amenities')
      }
    }
  };

  /**
   * ?????? ?????? ?????? ?????? ?????????
   */
  const onClickCurrentAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(curCoords.lng, curCoords.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setCountry("????????????");
        setCity(result[0].address?.region_1depth_name);
        setDistrict(result[0].address?.region_2depth_name);
        setStreetAddress(result[0]?.road_address?.road_name ?? '');
        setDetailAddress(result[0]?.road_address?.building_name ?? '');
        setPostcode(result[0].address?.zip_code ?? '');
      }
    });
  };

  return (
    <Container>
      <StageInfo>
        <h1>?????? ????????? ????????????????</h1>
      </StageInfo>
      <div className="selector-wrapper">
        <div className="map-wrapper">
          <Map
            center={{ ...curCoords }}
            style={{ width: "100%", height: "100%" }}
            draggable={isInputFinish}
            zoomable={isInputFinish}
            scrollwheel={isInputFinish}
            disableDoubleClick={!isInputFinish}
            disableDoubleClickZoom={!isInputFinish}
            level={12}
            onClick={(_t, mouseEvent) => {
              if (isInputFinish) {
                setPosition({
                  lat: mouseEvent.latLng.getLat(),
                  lng: mouseEvent.latLng.getLng(),
                });
              }
            }}
          >
            {position && isInputFinish && <MapMarker position={position} />}
          </Map>
          {!isInputFinish ? (
            <div className="input-wrapper">
              <h1>????????? ???????????????.</h1>
              <ul>
                <li>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value={""} disabled>
                      ?????? / ??????
                    </option>
                    {countryList.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </li>
                <li
                  className={!!city ? "isValid" : undefined}
                  onClick={() => cityInputRef.current?.focus()}
                >
                  <p>???/???</p>
                  <input
                    ref={cityInputRef}
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </li>

                <li
                  className={!!district ? "isValid" : undefined}
                  onClick={() => districtInputRef.current?.focus()}
                >
                  <p>???/???/???</p>
                  <input
                    ref={districtInputRef}
                    type="text"
                    onChange={(e) => setDistrict(e.target.value)}
                    value={district}
                  />
                </li>

                <li
                  className={!!streetAddress ? "isValid" : undefined}
                  onClick={() => streetAddressInputRef.current?.focus()}
                >
                  <p>???????????????</p>
                  <input
                    ref={streetAddressInputRef}
                    type="text"
                    onChange={(e) => setStreetAddress(e.target.value)}
                    value={streetAddress}
                  />
                </li>

                <li
                  className={!!detailAddress ? "isValid" : undefined}
                  onClick={() => detailAddressInputRef.current?.focus()}
                >
                  <p>????????? ??????, ????????? ??? (?????? ??????)</p>
                  <input
                    ref={detailAddressInputRef}
                    type="text"
                    onChange={(e) => setDetailAddress(e.target.value)}
                    value={detailAddress}
                  />
                </li>

                <li
                  className={!!postcode ? "isValid" : undefined}
                  onClick={() => postcodeInputRef.current?.focus()}
                >
                  <p>????????????</p>
                  <input
                    ref={postcodeInputRef}
                    type="text"
                    onChange={(e) => setPostcode(e.target.value)}
                    value={postcode}
                  />
                </li>
              </ul>

              <div className="currentAPI">
                <h2>?????? ????????? ????????? ????????? ????????? ???????????????.</h2>
                <button onClick={onClickCurrentAddress}>?????? ?????? ??????</button>
              </div>
            </div>
          ) : (
            <div className="pin-location">
              ????????? ????????? ?????? ??????(??????)??? ?????????.
              <span onClick={() => setIsInputFinish(false)}>??????</span>
            </div>
          )}
        </div>

        <Footer
          step={5}
          prevHref="/room/register/floor-plan"
          isValid={!!country && !!city && !!district && !!streetAddress && !!postcode}
        >
          <button className={"next-button"} onClick={onClickNextButton}>
            ??????
          </button>
        </Footer>
      </div>
    </Container>
  );
};

export default Location;
