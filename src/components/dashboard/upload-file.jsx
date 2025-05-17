"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";
import Image from "next/image"
import { useRef, useState } from "react"
import { DatePicker } from "./date-input";
import { Textarea } from "../ui/textarea";
import { LoadingSpinner } from "../ui/spinner";

const InputFormMetaData = ({setFormMetaData, formMetaData}) => {
    return(
        <>
            <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Recipient's Name</Label>
                <Input type="text" id="name" placeholder="name" onChange={(e) => setFormMetaData({...formMetaData, name: e.target.value})} />
            </div>
            <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                <Label htmlFor="event-title">Event Title</Label>
                <Input type="text" id="event-title" placeholder="Event" onChange={(e) => setFormMetaData({...formMetaData, eventTitle: e.target.value})} />
            </div>
            <div className="space-y-2 lg:max-w-sm w-full">
                <Label htmlFor="date">Event Date</Label>
                <DatePicker placeholder="Select a date" date={formMetaData.date} setDate={(val) => setFormMetaData({ ...formMetaData, date: val })} />
            </div>
            <div className="grid w-full lg:max-w-sm gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Type your description here." id="description" onChange={(e) => setFormMetaData({...formMetaData, description: e.target.value})}/>
            </div>
            <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                <Label htmlFor="issued">Issued By</Label>
                <Input type="text" id="issued" placeholder="Issued by" onChange={(e) => setFormMetaData({...formMetaData, issued: e.target.value})} />
            </div>
        </>
    )
}

const InputFile = ({inputRef, file, handleFile}) => {
    return(
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
            <Label>Upload File</Label>
            <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="w-full cursor-pointer"
            >
            <Upload className="w-4 h-4 mr-2" />
            {file ? "Change File" : "Select File"}
            </Button>
            <Input id="picture" ref={inputRef} type="file" onChange={handleFile} hidden/>
        </div>
    )
}

const PreviewFile = ({preview, handleRemovePreview}) => {
    return(
        <AnimatePresence>
            <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative h-60 w-full lg:mt-0 mt-10 overflow-hidden rounded-md"
            >
            <Image src={preview} alt="" fill className="object-contain" />
            <button
            type="button"
            onClick={handleRemovePreview}
            className="absolute top-0 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition-all"
            >
            <X className="w-4 h-4" />
            </button>
            </motion.div>
        </AnimatePresence>
    )
}

const LoadingAnalysis = () => {
  return(
    <div className="flex flex-col gap-4 items-center justify-center min-h-[200px]">
        <LoadingSpinner/>
        <p>Running analysis</p>
    </div>
  )
}

export function UploadDocument() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState([]);
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formMetaData, setFormMetaData] = useState({
        email: '',
        name: '',
        eventTitle: '',
        date: '',
        description: '',
        issued: '',
    })

    const handleFile = async (e) => {
        const selectedFile = e.target.files[0];

        if(selectedFile){
            setFile(selectedFile);
            setIsLoading(true);
            setPreview(null);

            await new Promise((resolve) => setTimeout(resolve, 3000))

            setPreview(URL.createObjectURL(selectedFile));
            setIsLoading(false);
        }
    }

    const handleRemovePreview = () => {
        setFile(null);
        setPreview(null);
    }

    const handleForm = () => {
        const dataSave = {
            file: file,
            ...formMetaData,
        }

        setFormData([...formData, dataSave]);
        setIsDialogOpen(false);
    }

    console.log(formData)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
      <Button className="gap-2 cursor-pointer">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </svg>
            Upload
        </Button>
      </DialogTrigger>
      <DialogContent className={`${preview ? "lg:min-w-[900px] w-full" : "sm:max-w-[425px] "}`}>
        <DialogHeader>
        <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Fill out the form below and upload your file. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        {isLoading && <LoadingAnalysis/>}
        {!isLoading &&
        <div className={`grid ${preview ? "lg:grid-cols-2" : ""} py-4`}>
            <div className="grid gap-4 h-fit">
                <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Recipient's Email</Label>
                    <Input type="email" id="email" placeholder="Recipient's Email" onChange={(e) => setFormMetaData({...formMetaData, email: e.target.value})} />
                </div>
                {preview && <InputFormMetaData setFormMetaData={setFormMetaData} formMetaData={formMetaData} />}
                {!preview && <InputFile inputRef={inputRef} file={file} handleFile={handleFile} />}
            </div>
            {preview && <PreviewFile preview={preview} handleRemovePreview={handleRemovePreview} />}
        </div>
        }
        {!isLoading &&
        <DialogFooter>
          <Button type="submit" className="cursor-pointer" onClick={handleForm}>Submit</Button>
        </DialogFooter>
        }
      </DialogContent>
    </Dialog>
  )
}