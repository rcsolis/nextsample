'use client'
import { useForm } from "react-hook-form";
import Link from 'next/link'

const Form = ({
  formTitle , defaultValues , handleFormSubmit
}) =>{
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    defaultValues: { ...defaultValues },
    mode: "onChange"
  });

  // Render
  return (<section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-center">
        <span className="blue_gradient">{formTitle}</span>
      </h1>
      <p className="desc text-left max-w-md">
        Information about the current or new item.
      </p>
      <form className="w-full max-w-2xl flex flex-row 
        flex-wrap justify-start items-center
        gap-7 glassmorphism" onSubmit={handleSubmit(handleFormSubmit)}>
          {defaultValues?._id && <input type="text" {...register("_id", { required: true })} />}
          
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">Title</span>
          </label>
          <input type="text" 
            placeholder="Title" 
            className="p-2 w-full border border-gray-400 rounded-lg"
            {...register("title", { required: true })} />
          {errors?.title?.type === "required" && <span className="text-red-500 w-full text-sm">This field is required</span>}
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">Content</span>
          </label>
          <input type="text"
            placeholder="Content"
            className="p-2 w-full border border-gray-400 rounded-lg"
            {...register("content", { required: true })} />
          {errors?.content?.type === "required" && <span className="text-red-500 w-full text-sm">This field is required</span>}
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">Tag</span>
          </label>
          <input type="text" 
            placeholder="Tag"
            className="p-2 w-full border border-gray-400 rounded-lg"
            {...register("tag")} />
          <button type="submit"
            className="w-full
              border border-gray-400 rounded-lg p-2 bg-blue-500 text-white font-bold hover:bg-blue-700 disabled:bg-blue-200"
            disabled={!isValid || isSubmitting}>
            {formTitle}
          </button>
          <div className="flex w-full justify-end">
            <Link href="/" className="w-1/3 gray-500 outline_btn">
              Cancel
            </Link>
          </div>
      </form>
    </section>)
}
export default Form