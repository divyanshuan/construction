import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Modal = ({ isOpen, onClose, title, children, big = false }) => {
  const panelSize = big ? "w-[70vw] h-[70vh]" : "w-full max-w-md";

  if (typeof isOpen !== "boolean") return null; // prevent undefined bug

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />

        {/* Panel */}
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${panelSize} overflow-y-auto transform rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all`}
              >
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-800 mb-2"
                >
                  {title}
                </Dialog.Title>
                <div className={big ? "h-[calc(100%-2rem)] overflow-auto" : ""}>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
