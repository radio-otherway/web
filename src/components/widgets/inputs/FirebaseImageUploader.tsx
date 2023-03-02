import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/lib/db";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  ChangeEventHandler,
} from "react";
var path = require("path");
import { UploadCloud } from "react-feather";
import { getFileExtension } from "@/lib/util/fileUtils";
import ITextInputProps from "@/components/widgets/inputs/props";
import {
  Controller,
  FieldPath,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";
import { ProfileForm } from "@/components/pages/profile/ProfilePageComponent";

interface IFirebaseImageUploaderProps {
  forType: "user" | "show";
  imageType: "avatar" | "profile";
  itemId: string;
  imageUrl?: string;
  controlName: FieldPath<ProfileForm>;
  setValue: UseFormSetValue<ProfileForm>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: ChangeEventHandler<HTMLInputElement>;
}

const FirebaseImageUploader = forwardRef<
  HTMLInputElement,
  IFirebaseImageUploaderProps
>(
  (
    {
      controlName,
      forType,
      imageType,
      itemId,
      imageUrl,
      setValue,
      onChange,
      onBlur,
    },
    ref
  ) => {
    const [file, setFile] = useState<File | null>();
    const [filePath, setFilePath] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [percent, setPercent] = useState(0);
    const fileInput = useRef<HTMLInputElement>(null);

    const [error, setError] = useState("");
    const _handleChange = (event: React.FormEvent<HTMLInputElement>) => {
      const e = event.target as HTMLInputElement;
      if (!e.files || e.files.length === 0) {
        return;
      }
      setFile(e.files[0]);
    };
    useEffect(() => {
      const _cleanUp = () => {
        setFile(null);
        setIsUploading(false);
        setPercent(0);
      };
      const _handleUpload = () => {
        if (!file) {
          setError("You must choose a file to upload first");
          return;
        }
        console.log("FirebaseImageUploader", "Creating storage refs", storage);
        const extension = getFileExtension(file);
        const newFilePath = path.join(
          "files",
          "images",
          forType,
          imageType,
          `${itemId}.${extension}`
        );
        setFilePath(newFilePath);
        console.log("FirebaseImageUploader", "FilePath", newFilePath);
        const remoteFileReference = storageRef(storage, newFilePath);

        console.log(
          "FirebaseImageUploader",
          "Created storage refs",
          remoteFileReference
        );
        console.log("FirebaseImageUploader", "Starting upload task");
        setIsUploading(true);
        const uploadTask = uploadBytesResumable(remoteFileReference, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(
              "FirebaseImageUploader",
              "uploading",
              `${percent}% done`
            );
            setPercent(percent);
          },
          (err) => {
            _cleanUp();
            console.log(err);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              if (controlName) {
                setValue(controlName, url);
              }
            });
            _cleanUp();
          }
        );
      };

      if (file && !isUploading) {
        _handleUpload();
      }
    }, [controlName, file, forType, imageType, isUploading, itemId, setValue]);

    return imageType === "avatar" ? (
      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          <span className="w-12 h-12 overflow-hidden rounded-full">
            {imageUrl ? (
              <Image
                alt="Existing image"
                src={imageUrl}
                className="w-full h-full "
                width={48}
                height={48}
              />
            ) : (
              <svg
                className="w-full h-full "
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </span>
          <button
            type="button"
            className={`btn-outline btn-primary btn gap-2 ${
              isUploading ? "loading" : ""
            }`}
            onClick={() => fileInput?.current?.click()}
          >
            <UploadCloud
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            />
            {!imageUrl ? "Upload image" : "Change image"}
          </button>

          <input
            name={controlName}
            placeholder="File input hidden"
            className="invisible"
            type="file"
            accept="image/*"
            ref={fileInput}
            onBlur={onBlur}
            onChange={($event) => {
              _handleChange($event);
              onChange($event);
            }}
          />
        </div>
        {percent > 0 && (
          <span className="block m-1 overflow-hidden text-xs italic text-gray-600 rounded-full">
            {`Uploading, ${percent}% done`}
          </span>
        )}
      </div>
    ) : (
      <div>Hello</div>
    );
  }
);
FirebaseImageUploader.displayName = "FirebaseImageUploader";
export default FirebaseImageUploader;
