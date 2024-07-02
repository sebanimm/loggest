"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Plate } from "@udecode/plate-common";
import { Loader2 } from "lucide-react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { getPost, updatePost } from "@/apis";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { serialize } from "@/lib/editor";
import { plugins } from "@/lib/plugins";

const formSchema = z.object({
  title: z.string().min(1).max(100).trim(),
  content: z.string(),
});

export default function RewritePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const postId = searchParams.get("id");

  if (!postId) {
    notFound();
  }

  const { data, error } = useQuery({
    queryKey: ["getPost", postId],
    queryFn: async () => await getPost(postId),
    enabled: !!session?.user,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  React.useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        content: JSON.parse(data.content),
      });
    }
  }, [data, form]);

  if (error) {
    notFound();
  }

  if (!data && !error) {
    return (
      <main className="flex h-[calc(100vh-56px)] w-full flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </main>
    );
  }

  if (status !== "loading" && (!session || !session.user)) {
    return router.replace("/api/auth/signin");
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updatePost(postId as string, {
        image: process.env.NEXT_PUBLIC_DEFAULT_IMG,
        title: values.title,
        content: values.content,
        description: serialize(JSON.parse(values.content)),
      });
      toast.success("게시물이 성공적으로 수정되었습니다.");
      router.back();
    } catch (err) {
      toast.error("게시물 수정에 실패하였습니다.");
    }
  };

  return (
    <main className="container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-12 pt-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:ring-transparent"
                    placeholder="제목을 입력하세요..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <div className="rounded-lg border bg-background">
                    <DndProvider backend={HTML5Backend}>
                      <Plate
                        key={field.name}
                        value={JSON.parse(data.content)}
                        plugins={plugins}
                        onChange={(value: any) => {
                          const content = JSON.stringify(value);
                          form.setValue("content", content);
                        }}
                      >
                        <FixedToolbar>
                          <FixedToolbarButtons />
                        </FixedToolbar>

                        <Editor
                          className="min-h-[70vh] border-none px-6"
                          focusRing={false}
                        />

                        <FloatingToolbar>
                          <FloatingToolbarButtons />
                        </FloatingToolbar>
                      </Plate>
                    </DndProvider>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            글 수정하기
          </Button>
        </form>
      </Form>
    </main>
  );
}
