"use client"

import { useRender } from "@base-ui/react/use-render"
import { type ComponentProps, createContext, useContext, useId } from "react"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import { Label } from "~/components/label"
import { Stack } from "~/components/stack"
import { controlTextClasses, descriptionClasses } from "~/lib/classes"
import { cn } from "~/lib/variants"

const Form = FormProvider

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({ ...props }: ControllerProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function useFormField() {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)
  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

interface FormItemContextValue {
  id: string
}

const FormItemContext = createContext<FormItemContextValue | null>(null)

function FormItem({ direction = "column", ...props }: ComponentProps<typeof Stack>) {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <Stack direction={direction} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ ...props }: ComponentProps<typeof Label>) {
  const { formItemId } = useFormField()

  return <Label htmlFor={formItemId} {...props} />
}

function FormControl({ children, render, ...props }: useRender.ComponentProps<"div">) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  // Renders *as* its single child (the form field), merging id/aria onto it —
  // the Base UI equivalent of Radix's `<Slot>`.
  return useRender({
    render: render ?? (children as useRender.RenderProp),
    props: {
      id: formItemId,
      "aria-describedby": !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props,
    },
  })
}

function FormDescription({ className, ...props }: ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return <p id={formDescriptionId} className={cn(descriptionClasses, className)} {...props} />
}

function FormMessage({ className, children, ...props }: ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      id={formMessageId}
      className={cn(`${controlTextClasses} font-medium text-danger`, className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}
