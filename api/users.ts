import { ColorId } from "unsplash-js";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import {
  ACCESS_KEY,
  PHOTOS_URL,
  SEARCH_PHOTOS_URL,
} from "../constants/unsplash";

interface UserPhotosRespose extends Photos {
  page: number;
}

export const getUserPhotosApi = (
  color: ColorId,
  page = 0,
  perPage = 15
): Promise<UserPhotosRespose> => {
  const body = new URLSearchParams();
  body.append("color", color);
  body.append("page", page.toString());
  body.append("per_page", perPage.toString());
  body.append("query", "*");

  const url = `${SEARCH_PHOTOS_URL}?${body.toString()}`;

  return fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (!result.ok) throw Error(result.statusText);
      return result.json();
    })
    .then((response) => {
      return {
        ...response,
        page,
      };
    });
};

export const getPhotoDetails = (photoId: string) => {
  if (!photoId) return Promise.reject("No provided photo id");

  const url = `${PHOTOS_URL}/${photoId}`;
  return fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (!result.ok) throw Error(result.statusText);
      return result.json();
    })
    .then((response) => {
      return {
        ...response,
      };
    });
};
