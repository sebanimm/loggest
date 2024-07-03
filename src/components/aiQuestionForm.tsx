"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormSchema = z.object({
  choices: z.enum(["1", "2", "3", "4"], {
    required_error: "정답을 골라 주세요.",
  }),
});

interface AIQuestionFormProps {
  introduction: string;
  choices: string[];
  answer: string;
}

export default function AIQuestionForm({
  introduction,
  choices,
  answer,
}: AIQuestionFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.choices !== answer) {
      toast.error("오답입니다!");
    } else {
      toast.success("정답입니다!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto space-y-6">
        <FormField
          control={form.control}
          name="choices"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <h1 className="mb-8 text-4xl font-semibold">AI 생성 문제</h1>
              <FormLabel className="text-2xl">Q. {introduction}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {choices.map((choice) => (
                    <FormItem
                      key={choice[0]}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={choice[0]} />
                      </FormControl>
                      <FormLabel className="text-lg font-normal">
                        {choice}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">정답 제출하기</Button>
      </form>
    </Form>
  );
}
