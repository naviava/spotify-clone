"use client";

// React and Next.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// External packages.
import qs from "query-string";

// Custom hooks.
import useDebounce from "@/hooks/useDebounce";

// Components.
import Input from "./Input";

interface SearchInputProps {}

export default function SearchInput({}: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = { title: debouncedValue };
    const url = qs.stringifyUrl({ url: "/search", query: query });
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(evt) => setValue(evt.target.value)}
    />
  );
}
