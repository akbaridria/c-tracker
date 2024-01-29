"use client";
import React from "react";
import { Button, Dialog, DialogPanel, Title } from "@tremor/react";

export default function Notes() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="text-center">
        <Button onClick={() => setIsOpen(true)} variant="secondary">Open Notes</Button>
      </div>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title className="mb-3">Delete Nodes</Title>
          You can delete the node/address by clicking the node in the flow and press <kbd>delete</kbd> button in your keyboard
          <div className="mt-3">
            <Button variant="light" onClick={() => setIsOpen(false)}>
              Got it!
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}