"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, StarIcon } from "lucide-react";
import React from "react";

import { createStar, deleteStar, getStars } from "@/apis";
import { Button } from "@/components/ui/button";

interface StarButtonProps {
  userId: string;
  postId: string;
}

export default function StarButton({ userId, postId }: StarButtonProps) {
  const [isMarked, setIsMarked] = React.useState(false);
  const [star, setStar] = React.useState(0);

  const { data: stars, isLoading } = useQuery({
    queryKey: ["get", "post", postId, "stars"],
    queryFn: async () => await getStars(postId),
  });

  const create = useMutation({
    mutationKey: ["post", "post", postId, "star"],
    mutationFn: async () => await createStar(userId, postId),
    onSuccess: () => {
      setIsMarked(true);
      setStar((prev) => prev + 1);
    },
  });

  const del = useMutation({
    mutationKey: ["delete", "post", postId, "star"],
    mutationFn: async () => await deleteStar(userId, postId),
    onSuccess: () => {
      setIsMarked(false);
      setStar((prev) => prev - 1);
    },
  });

  React.useEffect(() => {
    if (!stars) {
      return;
    }

    setIsMarked(stars.some((star) => star.userId === userId));
    setStar(stars.length);
  }, [stars, userId]);

  const handleButton = () => {
    if (isMarked) {
      del.mutate();
    } else {
      create.mutate();
    }
  };

  return (
    <Button variant="ghost" onClick={handleButton}>
      <StarIcon
        className="mr-2"
        fill={isMarked ? "#E3B341" : undefined}
        color={isMarked ? "#E3B341" : undefined}
      />
      {isLoading ? <Loader2 className="animate-spin" /> : star}
    </Button>
  );
}
