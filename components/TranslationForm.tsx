"use client";

import translate from "@/actions/translate";
import { TranslationLang } from "@/app/translate/page";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import logoPng from "/public/Google_Translate_logo_.png";

const initialState = {
  inputLanguages: "auto",
  input: "",
  outputLanguages: "en",
  output: "",
};

export type State = typeof initialState;

export default function TranslationForm({
  languages,
}: {
  languages: TranslationLang;
}) {
  // State
  const [state, formAction] = useFormState(translate, initialState);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  console.log(state);

  useEffect(() => {
    if (state.output) {
      setOutput(state.output);
    }
  }, [state]);
  return (
    <div>
      <div className="flex space-x-2">
        <div
          className="flex items-center group cursor-pointer border rounded-sm
        w-fit px-3 py-2 bg-[#E7F0FE] mb-5"
        >
          <Image src={logoPng} alt="logo" width={30} height={30} />
          <p className="text-sm font-medium text-blue-500 group-hover:underline ml-2 mt-1">
            Text
          </p>
        </div>
        {/* Voice recorder */}
      </div>

      <form action={formAction}>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
          <div className="flex-1 space-y-2">
            <Select name="inputLanguage" defaultValue="auto">
              <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>
                  <SelectItem key="auto" value="auto">
                    Auto-Detect
                  </SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {Object.entries(languages.translation).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Type your text here."
              className="min-h-32 text-xl"
              name="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          {/* output div */}
          <div className="flex-1 space-y-2">
            <Select name="outputLanguage" defaultValue="en">
              <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>
                  <SelectItem key="auto" value="auto">
                    Auto-Detect
                  </SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {Object.entries(languages.translation).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Type your text here."
              className="min-h-32 text-xl"
              name="output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
        </div>
        {/* submit  */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
