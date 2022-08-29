import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
// import { IoExitOutline } from "react-icons/io5";

interface BaseModalProps {
  children: React.ReactNode;
  styles?: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function BaseModal(props: BaseModalProps) {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classNames(
              "fixed inset-0 h-full w-full bg-black/40",
              props.styles?.modalOverlay
            )}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-max overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* <div className="absolute right-2 top-2 cursor-pointer rounded-full bg-gray-50 p-2">
                  <IoExitOutline className="h-6 w-6 cursor-pointer" />
                </div> */}

                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
