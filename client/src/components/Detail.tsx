import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import axios from "axios";
import { Response } from "./Create";

interface LinkInfo {
  to: string;
  from: string;
  clicks: number;
}
export const Detail = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // const [to, setTo] = useState("");
  // const [from, setFrom] = useState("");
  // const [clicks, setClicks] = useState(0);
  const [linkOptions, setLinkOptions] = useState<LinkInfo>({
    to: "",
    from: "",
    clicks: 0,
  });
  const getLink = useCallback(async () => {
    try {
      await axios
        .get<Response>(`https://yshrt.herokuapp.com/api/link/detail/${path}`)
        .then((response) => {
          const { to, from, clicks } = response.data;
          setLinkOptions({ to, from, clicks });
        });
    } catch (e) {
      console.log(e);
    }
  }, [path]);
  useEffect(() => {
    getLink();
  }, [getLink]);
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Ссылка</h1>
        <p>
          Короткая ссылка:{" "}
          <a href={linkOptions.to} rel="noreferrer" target="_blank">
            {linkOptions.to}
          </a>
        </p>
        <p>
          Откуда:{" "}
          <a href={linkOptions.from} rel="noreferrer" target="_blank">
            {linkOptions.from}
          </a>
        </p>
        <p>Количество кликов по ссылке: {linkOptions.clicks}</p>
      </div>
    </div>
  );
};
