import { Label } from "@/components/ui/label";
import { X, Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { UnsavePopup } from "@/registry/kl-ui/unsave-popup/unsave-popup";
import { cn } from "@/lib/utils";

export function UnsavePopupUI() {
  const [value, setValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [shouldBlockNav, setShouldBlockNav] = useState(false);
  const [closeForm, setCloseForm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setShowPopup(true);
      setIsSaved(false);
    },
    []
  );

  const handleSave = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPopup(false);
    setIsSaved(true);
  }, []);

  const handleReset = useCallback(() => {
    setValue("");
    setShowPopup(false);
    setShouldBlockNav(false);
  }, []);

  const handleCloseFormClick = useCallback(() => {
    if (value && !isSaved) {
      setShouldBlockNav(true);
      setTimeout(() => setShouldBlockNav(false), 100);
      return;
    }
    setCloseForm(true);
  }, [value, isSaved]);

  const shouldBlockFn = useCallback(() => shouldBlockNav, [shouldBlockNav]);

  const formContent = useMemo(
    () => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name" className="font-medium">
          Name
        </Label>
        <Input
          placeholder="Type anything to trigger it..."
          value={value}
          className="text-sm"
          onChange={handleInputChange}
        />
      </div>
    ),
    [value, handleInputChange]
  );

  const popupContent = useMemo(
    () => (
      <>
        <Info className="h-4 w-4" /> Try to press the &quot;x&quot; to close it!
      </>
    ),
    []
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {!closeForm && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="flex flex-col h-full items-center justify-center p-2"
          >
            <div
              className={cn(
                "flex items-center justify-center p-4 gap-2 border border-gray-200 dark:border-zinc-700",
                "rounded-lg w-full max-w-[500px] h-[300px] shadow-md relative dark:bg-zinc-900"
              )}
            >
              {formContent}
              <div className="absolute top-1 right-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseFormClick}
                  className="rounded-full hover:bg-transparent"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <UnsavePopup
        onSave={handleSave}
        onReset={handleReset}
        shouldBlockFn={shouldBlockFn}
        show={showPopup}
        className="w-full"
      >
        {popupContent}
      </UnsavePopup>
    </>
  );
}
