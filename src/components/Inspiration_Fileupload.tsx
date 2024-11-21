"use client";

import { customsubmitTheme } from "@/app/customTheme/appTheme";
import { Button, FileInput, Label } from "flowbite-react";

const Inspiration_Fileupload = () => {
    return (
        <div>
            <div>
                <Label htmlFor="file-upload-helper-text" value="Upload file" />
            </div>
            <FileInput id="file-upload-helper-text" accept="image/*" helperText="JPEG, PNG, JPG" />
            <Button size="xs" className="text-nowrap" theme={customsubmitTheme} color="appsuccess">UPLOAD</Button>
        </div>
    );
}

export default Inspiration_Fileupload;