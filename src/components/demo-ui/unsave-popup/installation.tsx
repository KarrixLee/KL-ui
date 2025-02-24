import { codeToHtml } from "shiki";
import { InstallationTabs } from "../info-card/installation-tabs";

const installationCode = `"use client";

import { Loader2, Save } from "lucide-react";
import { AnimatePresence, easeOut, motion, useAnimation } from "motion/react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { cn } from "@/lib/utils";
import React from "react";

const UnsavePopupDescription = memo(
  ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-row items-center gap-2">{children}</div>;
  }
);
UnsavePopupDescription.displayName = "UnsavePopupDescription";

const UnsavePopupAction = memo(
  ({
    children,
    isLoading,
    onClick,
  }: {
    children: React.ReactNode;
    isLoading?: boolean;
    onClick?: () => Promise<void>;
  }) => {
    return (
      <Button onClick={onClick} disabled={isLoading} className="rounded-lg">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </span>
        ) : (
          children
        )}
      </Button>
    );
  }
);
UnsavePopupAction.displayName = "UnsavePopupAction";

const UnsavePopupDismiss = memo(
  ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => {
    return (
      <Button variant="ghost" onClick={onClick} className="rounded-lg">
        {children}
      </Button>
    );
  }
);
UnsavePopupDismiss.displayName = "UnsavePopupDismiss";

// Main component
const UnsavePopup = memo(function UnsavePopup({
  children,
  onSave,
  onReset,
  shouldBlockFn,
  show,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  onSave?: () => Promise<void>;
  onReset?: () => void;
  shouldBlockFn?: () => boolean;
  show: boolean;
}) {
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(false);

  const shakeAnimation = useCallback(
    () => ({
      x: [0, -8, 12, -15, 8, -10, 5, -3, 2, -1, 0],
      y: [0, 4, -9, 6, -12, 8, -3, 5, -2, 1, 0],
      filter: [
        "blur(0px)",
        "blur(2px)",
        "blur(2px)",
        "blur(3px)",
        "blur(2px)",
        "blur(2px)",
        "blur(1px)",
        "blur(2px)",
        "blur(1px)",
        "blur(1px)",
        "blur(0px)",
      ],
      "--warning-opacity": [0, 0.5, 0.3, 0.1, 0], 
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    }),
    []
  );

  const triggerShake = useCallback(async () => {
    await controls.start(shakeAnimation());
  }, [controls, shakeAnimation]);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    await onSave?.();
    setIsLoading(false);
  }, [onSave]);

  const handleReset = useCallback(() => {
    onReset?.();
  }, [onReset]);

  const { hasCompoundComponents, hasValidComponents } = useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    const hasCompound = childrenArray.some(
      (child) =>
        React.isValidElement(child) &&
        (child.type === UnsavePopupDescription ||
          child.type === UnsavePopupAction ||
          child.type === UnsavePopupDismiss)
    );

    if (!hasCompound) {
      return { hasCompoundComponents: false, hasValidComponents: true };
    }

    const hasDescription = childrenArray.some(
      (child) =>
        React.isValidElement(child) && child.type === UnsavePopupDescription
    );
    const hasAction = childrenArray.some(
      (child) => React.isValidElement(child) && child.type === UnsavePopupAction
    );
    const hasDismiss = childrenArray.some(
      (child) =>
        React.isValidElement(child) && child.type === UnsavePopupDismiss
    );

    return {
      hasCompoundComponents: true,
      hasValidComponents: hasDescription && hasAction && hasDismiss,
    };
  }, [children]);

  useEffect(() => {
    if (hasCompoundComponents && !hasValidComponents) {
      throw new Error(
        cn(
          "When using UnsavePopupDescription, UnsavePopupAction, or UnsavePopupDismiss, ",
          "you must use all three components together. Check out the docs for more info."
        )
      );
    }
  }, [hasCompoundComponents, hasValidComponents]);

  const defaultButtons = useCallback(
    () => (
      <div className="flex flex-row items-center gap-1">
        <Button variant="ghost" onClick={handleReset} className="rounded-lg">
          Reset
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="rounded-lg"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </span>
          )}
        </Button>
      </div>
    ),
    [isLoading, handleReset, handleSave]
  );

  useEffect(() => {
    if (shouldBlockFn && shouldBlockFn()) {
      triggerShake();
    }
  }, [shouldBlockFn, triggerShake]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
          className="fixed right-0 bottom-4 left-0 z-50 mx-auto w-fit"
        >
          <motion.div
            animate={controls}
            className={cn(
              "flex w-96 flex-row items-center justify-between gap-2 rounded-lg",
              "border border-gray-200 bg-white dark:border-zinc-700",
              "dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950",
              "px-4 py-2 text-sm shadow-md",
              "relative before:absolute before:inset-0 before:rounded-lg",
              "before:bg-red-500 [--warning-opacity:0]",
              "before:opacity-[var(--warning-opacity)]",
              "before:pointer-events-none",
              className
            )}
          >
            {hasCompoundComponents ? (
              children
            ) : (
              <>
                <div className="flex flex-row items-center gap-2">
                  {children}
                </div>
                {defaultButtons()}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

UnsavePopup.displayName = "UnsavePopup";

export {
  UnsavePopup,
  UnsavePopupDescription,
  UnsavePopupAction,
  UnsavePopupDismiss,
};
`;

export async function UnsavePopupInstallationCode() {
  const html = await codeToHtml(installationCode, {
    lang: "bash",
    theme: "min-dark",
  });

  return (
    <InstallationTabs
      codeHtml={html}
      layoutIdPrefix="unsave-popup"
      cliCommand="shadcn@latest add 'https://karrix.dev/r/unsave-popup'"
      importCode="import { UnsavePopup } from '@/components/kl-ui/unsave-popup'"
    />
  );
}
