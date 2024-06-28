"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plate } from "@udecode/plate-common";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import instance from "@/apis/instance";
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

const defaultValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Hello, World!" }],
  },
];

export default function CreatePage() {
  const router = useRouter();
  const session = useSession();
  const [initialValue, setInitialValue] = React.useState(defaultValue);
  const [title, setTitle] = React.useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: JSON.stringify(defaultValue),
    },
  });
  React.useEffect(() => {
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
      setInitialValue(JSON.parse(savedContent));
      form.setValue("content", savedContent);
    }
    const savedTitle = localStorage.getItem("title");
    if (savedTitle) {
      setTitle(savedTitle);
      form.setValue("title", savedTitle);
    }
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await instance.post("/post", {
        image: process.env.DEFAULT_IMG,
        title: values.title,
        content: values.content,
        description: serialize(JSON.parse(values.content)),
        email: session.data?.user?.email,
      });
      toast.success("게시물이 성공적으로 작성되었습니다.");
      router.push("/");
      localStorage.removeItem("content");
      localStorage.removeItem("title");
    } catch (err) {
      toast.error("게시물 작성에 실패하였습니다.");
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
                    value={title}
                    className="focus-visible:ring-transparent"
                    placeholder="제목을 입력하세요..."
                    onChange={(e) => {
                      const { value } = e.currentTarget;
                      setTitle(value);
                      localStorage.setItem("title", value);
                      form.setValue("title", value);
                    }}
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
                        key={JSON.stringify(initialValue)}
                        onChange={(value) => {
                          const content = JSON.stringify(value);
                          localStorage.setItem("content", content);
                          form.setValue("content", content);
                        }}
                        plugins={plugins}
                        initialValue={initialValue}
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
            글 작성하기
          </Button>
        </form>
      </Form>
    </main>
  );
}
