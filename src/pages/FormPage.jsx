import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

const formSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => {
      if (!value) return false;

      try {
        const phone = parsePhoneNumber(value);
        return Boolean(phone && isValidPhoneNumber(value));
      } catch {
        return false;
      }
    }, "Please enter a valid international phone number"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  error,
  rightElement,
  helperText,
}) => {
  return (
    <div className="space-y-2.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          <Icon className="h-4 w-4" />
        </div>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          className={`w-full rounded-2xl border bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition ${
            error
              ? "border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              : "border-slate-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
          }`}
        />

        {rightElement ? (
          <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
            {rightElement}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="text-sm font-medium text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-sm text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

const FormPage = () => {
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const phoneValue = watch("phoneNumber");

  let phoneMeta = null;

  try {
    if (phoneValue) {
      const parsed = parsePhoneNumber(phoneValue);
      if (parsed) {
        phoneMeta = {
          country: parsed.country,
          formatted: parsed.formatInternational(),
        };
      }
    }
  } catch {
    phoneMeta = null;
  }

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    setIsSubmittedSuccessfully(true);
    reset();

    setTimeout(() => {
      setIsSubmittedSuccessfully(false);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              Form Validation
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fill in your details below and submit the form.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            <ShieldCheck className="h-4 w-4" />
            Secure Input
          </div>
        </div>

        {isSubmittedSuccessfully && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Form submitted successfully
              </p>
              <p className="mt-1 text-sm text-emerald-600">
                All fields passed validation and the form has been submitted.
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FormField
                id="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                icon={User}
                register={register("fullName")}
                error={errors.fullName?.message}
                helperText="Use your complete legal or professional name."
              />
            </div>

            <div className="sm:col-span-2">
              <FormField
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                icon={Mail}
                register={register("email")}
                error={errors.email?.message}
                helperText="We’ll use this email for communication purposes."
              />
            </div>

            <div className="sm:col-span-2 space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-semibold text-slate-800"
                >
                  Phone Number
                </label>

                <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  <Smartphone className="h-3.5 w-3.5" />
                  Intl. Validated
                </div>
              </div>

              <div
                className={`rounded-2xl border bg-slate-50 px-4 py-3.5 transition ${
                  errors.phoneNumber
                    ? "border-red-300 bg-red-50/40 focus-within:border-red-400 focus-within:ring-4 focus-within:ring-red-100"
                    : "border-slate-200 focus-within:border-slate-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-slate-100"
                }`}
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Smartphone className="h-3.5 w-3.5" />
                  Select country and enter a complete number
                </div>

                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      id="phoneNumber"
                      international
                      defaultCountry="PK"
                      countryCallingCodeEditable={false}
                      placeholder="Enter phone number"
                      value={field.value}
                      onChange={(value) => field.onChange(value || "")}
                      className="phone-input-premium"
                    />
                  )}
                />
              </div>

              {errors.phoneNumber ? (
                <p className="text-sm font-medium text-red-600">
                  {errors.phoneNumber.message}
                </p>
              ) : phoneMeta ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Detected Format
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {phoneMeta.formatted}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Country: {phoneMeta.country || "Unknown"}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Your number will be validated in international format.
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <FormField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                icon={Lock}
                register={register("password")}
                error={errors.password?.message}
                helperText="Password must contain at least 6 characters."
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-slate-400 transition hover:text-slate-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
