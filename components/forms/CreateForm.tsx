"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CreateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const minLen = 5;
  const titleLen = title.trim().length;
  const descLen = description.trim().length;
  const isValid = titleLen >= minLen && descLen >= minLen;

  const reset = () => {
    setTitle("");
    setDescription("");
  };

  const handleCancel = () => {
    setIsOpen(false);
    reset();
  };

  const handleCreate = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log("Creating form with:", { title, description });
    if (!isValid) return; // guard
    // TODO: call your server action / API here with { title, description }
    // await createForm({ title, description });
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98]">
        <Plus className="h-4 w-4" />
        Create Form
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) reset(); // reset when closing via overlay/Esc
        }}>
        <DialogContent className="sm:max-w-[520px]">
          <form onSubmit={handleCreate} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create New Form</DialogTitle>
              <DialogDescription>
                This will create a new form. Ensure all details are accurate.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1.5">
              <Label htmlFor="form-title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="form-title"
                placeholder="Form Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-invalid={titleLen > 0 && titleLen < minLen}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                {titleLen < minLen
                  ? `Enter at least ${minLen} characters (${titleLen}/${minLen})`
                  : "Looks good"}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="form-description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="form-description"
                placeholder="Form Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-invalid={descLen > 0 && descLen < minLen}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                {descLen < minLen
                  ? `Enter at least ${minLen} characters (${descLen}/${minLen})`
                  : "Looks good"}
              </p>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
