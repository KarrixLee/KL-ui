"use client";

import {
  Ellipsis,
  MessageCircle,
  Repeat2,
  Heart,
  ChartNoAxesColumn,
  Bookmark,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function TweetCard() {
  return (
    <motion.div
      className="max-w-[500px] rounded-lg border border-gray-200 dark:border-zinc-700/50 p-4 pb-3 shadow-sm bg-gradient-to-r from-pink-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-900"
      style={{
        originY: "top",
      }}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.2,
        delay: 0.2,
      }}
    >
      <Link
        href="https://x.com/shadcn/status/1890422385905401870"
        target="_blank"
      >
        <div className="flex items-start gap-3">
          <Image
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">shadcn</span>
              <Image
                src="/twitter-tick.svg"
                alt="Twitter"
                width={22}
                height={22}
              />
              <span className="text-gray-500 text-sm">@shadcn</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">Feb 14</span>
              <button className="ml-auto text-gray-500 hover:text-blue-500">
                <Ellipsis className="h-4 w-4" />
              </button>
            </div>
            <div className="text-gray-500 text-xs">Replying to @me</div>
            <div className="py-2 text-[15px]">Amazing!</div>
            <div className="mt-2 flex items-center justify-between text-gray-500">
              <button className="rounded-full p-2 hover:bg-blue-50 dark:hover:bg-zinc-700/50 hover:text-blue-500 transition-colors">
                <MessageCircle className="h-4 w-4" />
              </button>
              <button className="rounded-full p-2 hover:bg-green-50 dark:hover:bg-zinc-700/50 hover:text-green-500 transition-colors">
                <Repeat2 className="h-4 w-4" />
              </button>
              <button className="rounded-full p-2 hover:bg-pink-50 dark:hover:bg-zinc-700/50 text-pink-600 transition-colors">
                <Heart className="h-4 w-4" />
              </button>
              <button className="rounded-full p-2 hover:bg-blue-50 dark:hover:bg-zinc-700/50 hover:text-blue-500 transition-colors">
                <ChartNoAxesColumn className="h-4 w-4" />
              </button>
              <div className="flex items-center">
                <button className="rounded-full p-2 hover:bg-blue-50 dark:hover:bg-zinc-700/50 hover:text-blue-500 transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className="rounded-full p-2 hover:bg-blue-50 dark:hover:bg-zinc-700/50 hover:text-blue-500 transition-colors">
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
