import React, { useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import Modal from "react-modal";

Modal.setAppElement("#root"); // for accessibility

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

const HouseGrid = ({ houses, houseFiles }) => {
  const navigate = useNavigate();
  const [selectedHouse, setSelectedHouse] = useState(null);

  const openModal = (house) => setSelectedHouse(house);
  const closeModal = () => setSelectedHouse(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {houses.map((house) => (
          <div
            key={house.house_id}
            onClick={() => openModal(house)}
            className="relative rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 border border-white/20 h-[200px]"
          >
            <div className="absolute inset-0 z-0 h-full">
              <Slider {...sliderSettings}>
                {(houseFiles[house.house_id]?.length
                  ? houseFiles[house.house_id]
                  : [1, 2, 3]
                ).map((file, index) => (
                  <div className="h-full" key={file?.file_id || index}>
                    <img
                      src={
                        file?.file_path
                          ? `${baseUrl}/${file.file_path}`
                          : `https://source.unsplash.com/random/800x600?sig=${index}&house=${house.house_id}`
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

            <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-xs flex flex-col justify-center items-center text-white text-center p-4">
              <div className="h-2/5"></div>
              <h2 className="text-lg font-bold drop-shadow-md group-hover:scale-105 transition">
                {house.title}
              </h2>
              <p className="text-[11px] italic mt-1 line-clamp-2">
                {house.description}
              </p>
              <p className="mt-2 text-[10px] bg-white/20 rounded-full px-3 py-1 backdrop-blur-md border border-white/30">
                Click to View Details →
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedHouse}
        onRequestClose={closeModal}
        contentLabel="House Images"
        className="max-w-4xl mx-auto mt-20 bg-white rounded-xl p-6 outline-none shadow-xl overflow-y-auto max-h-[80vh] relative"
        overlayClassName="fixed inset-0 bg-black/60 flex items-start justify-center z-50"
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-black text-2xl font-bold hover:text-gray-600"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {selectedHouse?.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {houseFiles[selectedHouse?.house_id]?.map((file) => (
            <img
              key={file.file_id}
              src={`${baseUrl}/${file.file_path}`}
              alt={file.file_name || "House"}
              className="w-full h-48 object-cover rounded-md"
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default HouseGrid;
