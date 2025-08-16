import { ChangeEvent, useRef } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type UploadInputProps = {
  children?: React.ReactNode;
  className?: string;
  accept?: string[];
  multiple?: boolean;
  maxFileLimit?: number;
  maxFileSize?: number; // in bytes

  disabled?: boolean;
  onChange?: (e: FileList | null) => void;
  onFileLimitExceeded?: () => void;
  onFileSizeExceeded?: () => void;
  onClick?: () => void;
  autoSubmit?: boolean;
};

export default function UploadInput(props: UploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && typeof props.maxFileLimit !== "undefined") {
      if (e.currentTarget.files.length > props.maxFileLimit) {
        e.preventDefault();
        e.stopPropagation();
        props.onFileLimitExceeded?.();
        return;
      }
    }

    if (typeof props.maxFileSize !== "undefined" && e.currentTarget.files) {
      const files = Array.from(e.currentTarget.files);
      for (const file of files) {
        if (props.maxFileSize && file.size > props.maxFileSize) {
          props.onFileSizeExceeded?.();
          return;
        }
      }
    }

    props.autoSubmit && submitRef.current?.click();
    props.onChange?.(e.currentTarget.files);
  };
  return (
    <div
      className={cn(
        "flex flex-col p-5 items-center justify-center w-full h-full border-2 border-muted border-dashed rounded-md cursor-pointer",
        props.className
      )}
      onClick={() => {
        if (props.disabled) return;
        props.onClick
          ? props.onClick()
          : inputRef.current && inputRef.current?.click();
      }}
    >
      {props.children}
      <Input
        ref={inputRef}
        type="file"
        name="avatar-image"
        accept={props.accept?.map((type) => `${type}`).join(",")}
        style={{
          display: "none",
        }}
        multiple={props.multiple}
        onChange={changeHandler}
      />
      {props.autoSubmit && (
        <Button
          ref={submitRef}
          type="submit"
          style={{
            display: "none",
          }}
        />
      )}
    </div>
  );
}
