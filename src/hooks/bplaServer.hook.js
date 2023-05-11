import { useRef, useState } from 'react';
import http from '../axios.common';
import { useAuth } from './auth.hook';

export default function useBplaServer() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const formData = useRef(new FormData());

  function createBpla(onUploadProgress) {
    setIsLoading(true);
    return http
      .post('/upload', formData.current, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + auth.token,
        },
        onUploadProgress,
      })
      .then((res) => {
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        throw Error('Помилка при додаванні даних. Можливо такі вже є');
      });
  }

  function getBplas(query = '') {
    setIsLoading(true);
    return http.get('/bpla' + query).then((res) => {
      setIsLoading(false);
      return res.data;
    });
  }

  function getBplaId(id) {
    setIsLoading(true);
    return http.get('/bpla/' + id).then((res) => {
      setIsLoading(false);
      return res.data;
    });
  }

  return { formData, createBpla, getBplas, getBplaId, isLoading };
}
