import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  Fragment,
} from "react";
import { Header } from "./Header";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ContextDescription, Response } from "./Create";
import { Link } from "react-router-dom";

export const LinksList = () => {
  const [links, setLinks] = useState<Array<Response>>([]);
  const { userId }: ContextDescription = useContext(AuthContext);
  const getLinks = useCallback(async () => {
    await axios
      .get<Array<Response>>(`https://yshrt.herokuapp.com/api/link/${userId}`)
      .then((response) => {
        setLinks(response.data);
      });
  }, [userId]);
  useEffect(() => {
    getLinks();
  }, [getLinks]);
  if (!links.length) {
    return (
      <Fragment>
        <Header />
        <p className="center">Ссылок пока нет</p>
      </Fragment>
    );
  }
  return (
    <div>
      <Header />
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Оригинальная</th>
            <th>Сокращенная</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          {links.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>
                  <Link to={`/detail/${item._id}`}>Открыть</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
