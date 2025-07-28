import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVillages, fetchFilesByVillage } from "../api";
import Slider from "react-slick";
import { baseUrl } from "../utils/baseUrl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css"; // You're already using this

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 2000,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: false,
};

const VillageList = () => {
  const [villages, setVillages] = useState([]);
  const [villageFiles, setVillageFiles] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const villageData = await fetchVillages();
        setVillages(villageData);

        const filesMap = {};
        await Promise.all(
          villageData.map(async (village) => {
            const files = await fetchFilesByVillage(village.village_id);
            filesMap[village.village_id] = files;
          })
        );
        setVillageFiles(filesMap);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
        🌾 Explore Villages
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {villages.map((village) => (
          <div
            key={village.village_id}
            onClick={() => navigate(`/village/${village.village_id}`)}
            className="relative rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 border border-white/20 h-[200px]"
          >
            <div className="absolute inset-0 z-0 h-full">
              <Slider {...sliderSettings}>
                {(villageFiles[village.village_id]?.length
                  ? villageFiles[village.village_id]
                  : [1, 2, 3]
                ).map((file, index) => (
                  <div className="h-full" key={file?.file_id || index}>
                    <img
                      src={
                        file?.file_path
                          ? `${baseUrl}/${file.file_path}`
                          : `https://source.unsplash.com/random/800x600?sig=${index}&village=${village.village_id}`
                      }
                      alt={file?.file_name || "Fallback"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-fallback.jpg";
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div
              className="absolute inset-0 z-10 bg-white/10 backdrop-blur-xs
             flex flex-col justify-center items-center text-white text-center p-4"
            >
              <div className="h-2/5"></div>
              <h2 className="text-lg font-bold drop-shadow-md group-hover:scale-105 transition">
                {village.name}
              </h2>
              <p className="text-[11px] italic mt-1 line-clamp-2">
                {village.description}
              </p>
              <p className="mt-2 text-[10px] bg-white/20 rounded-full px-3 py-1 backdrop-blur-md border border-white/30">
                Click to View Houses →
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VillageList;
