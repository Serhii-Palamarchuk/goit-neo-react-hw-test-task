import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../features/campers/campersSlice";

const CamperDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail, detailStatus, detailError } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (detailStatus === "loading") return <p>Loading details...</p>;
  if (detailStatus === "failed") return <p>Error: {detailError}</p>;
  if (!detail) return null;

  return (
    <div>
      <h2>{detail.name}</h2>
      <img
        src={detail.images[0]}
        alt={detail.name}
        style={{ width: "100%", maxWidth: 500 }}
      />
      <p>
        Price:{" "}
        {new Intl.NumberFormat("en-IN", {
          minimumFractionDigits: 2,
        }).format(detail.price)}
      </p>
      <ul>
        {detail.AC && <li>Air Conditioning</li>}
        {detail.kitchen && <li>Kitchen</li>}
        {/* інші булеві характеристики */}
      </ul>
      {/* Тут буде форма бронювання */}
    </div>
  );
};

export default CamperDetailPage;
