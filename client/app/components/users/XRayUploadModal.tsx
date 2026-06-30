import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomInput } from "@/components/global/CustomInput";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import {
  createLabResult,
  deleteFile
} from "@/lib/api";

const XRayUploadModal = ({ patientId }: { patientId: string }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [hasFiles, setHasFiles] = useState(false);
  const form = useForm({ defaultValues: { bodyPart: "", notes: "" } });

  const mutation = useMutation({
    mutationFn: createLabResult,
    onSuccess: () => {
      setOpen(false);
      toast.success("X-Ray recorded successfully");
      form.reset();
      setImageUrl("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to record X-Ray");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      setImageUrl("");
      toast.success("File deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete file");
    },
  });

  const handleSave = (formData: any) => {
    if (!imageUrl) return toast.error("Please upload an image first");
    mutation.mutate({
      patientId,
      testType: "X-Ray",
      bodyPart: formData.bodyPart,
      imageUrl,
      aiAnalysis: "Processing...",
    });
  };
  const removeFile = () => {
    deleteMutation.mutate({
      file: imageUrl,
    });
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload X-Ray</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg card">
        <DialogHeader>
          <DialogTitle>Upload New X-Ray</DialogTitle>
        </DialogHeader>
        {!imageUrl ? (
          <UploadDropzone
            endpoint="imageUploader"
            onChange={(files) => setHasFiles(files.length > 0)}
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].ufsUrl);
              setHasFiles(false);
              toast.success("Image Uploaded successful");
            }}
            headers={async () => {
              const session = await authClient.getSession();
              return {
                Authorization: `Bearer ${session.data?.session.token}`,
              };
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
            content={{
              label: "Drop your X-Ray image here",
              allowedContent: "Images up to 4MB",
              button({ ready, isUploading }) {
                if (isUploading) return "Uploading...";
                if (ready && hasFiles) return "Upload X-Ray";
                if (ready) return "Choose X-Ray";
                return "Getting ready...";
              },
            }}
            appearance={{
              container:
                "border-2 border-dashed border-border rounded-xl p-6 bg-muted/30 hover:bg-muted/50 transition-colors",
              uploadIcon: "text-primary",
              label: "text-foreground font-medium",
              allowedContent: "text-muted-foreground text-sm",
              button:
                "bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors ut-uploading:cursor-not-allowed ut-uploading:opacity-70",
            }}
          />
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Preview"
                className="h-full w-full object-contain"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                type="button"
                onClick={() => removeFile()}
                disabled={deleteMutation.isPending}
              >
                Remove
              </Button>
            </div>

            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-3"
            >
              <CustomInput
                control={form.control}
                name="bodyPart"
                label="Body Part"
                placeholder="e.g. Left Knee"
                disabled={mutation.isPending}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                Save to Patient Record
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default XRayUploadModal;