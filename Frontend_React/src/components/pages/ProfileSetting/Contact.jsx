import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { Phone, MapPin, Linkedin, Globe, Github, Pencil, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useProfileInfo } from "@/contextProvider/ProfileContextProvider";
import { useState, useEffect } from "react";

export default function Contact() {
  const { profileInfo, setProfileInfo } = useProfileInfo();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      contact: {
        phone: "",
        address: "",
        linkedin: "",
        portfolio: "",
        github: "",
      }
    },
    mode: "onChange",        // live validation
    reValidateMode: "onChange"
  });

  // Watch input values for sanitization
  const watchFields = watch("contact");

  // Live sanitize: trim strings, fix URLs
  useEffect(() => {
    Object.keys(watchFields).forEach(key => {
      let value = watchFields[key];
      if (typeof value === "string") {
        value = value.trim();  // remove leading/trailing whitespace
        if ((key === "linkedin" || key === "portfolio" || key === "github") && value && !value.startsWith("http")) {
          value = "https://" + value; // basic URL fix
        }
        if (value !== watchFields[key]) setValue(`contact.${key}`, value, { shouldValidate: true });
      }
    });
  }, [watchFields, setValue]);

  const onSubmit = (data) => {
    const updated = { ...profileInfo, contact: data.contact };
    setProfileInfo(updated);
    localStorage.setItem("basicInfo", JSON.stringify(updated));
    setIsEditing(false);
  };

  useEffect(() => {
    reset({
      contact: profileInfo?.contact || {
        phone: "",
        address: "",
        linkedin: "",
        portfolio: "",
        github: ""
      }
    });
  }, [profileInfo, reset]);

  const fields = [
    { name: "phone", label: "Phone", icon: Phone, placeholder: "Enter phone number", pattern: /^[0-9]{10,15}$/ },
    { name: "address", label: "Address", icon: MapPin, placeholder: "Enter address" },
    { name: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "LinkedIn profile URL", pattern: /^https?:\/\/(www\.)?linkedin\.com\/.*$/ },
    { name: "portfolio", label: "Portfolio", icon: Globe, placeholder: "Portfolio website", pattern: /^https?:\/\/.*$/ },
    { name: "github", label: "GitHub", icon: Github, placeholder: "GitHub profile URL", pattern: /^https?:\/\/(www\.)?github\.com\/.*$/ },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Contact Information</CardTitle>
          {!isEditing ? (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </Button>
          ) : (
            <Button variant="success" size="sm" onClick={handleSubmit(onSubmit)}>
              <Save className="w-4 h-4 mr-1" /> Save
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {!isEditing ? (
            <div className="space-y-3">
              {fields.map(({ name, label, icon: Icon }) => (
                <div key={name} className="flex items-center gap-3 border rounded-lg p-3 bg-muted/30">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-muted-foreground">
                      {profileInfo?.contact?.[name] || "Not provided"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            fields.map(({ name, label, icon: Icon, placeholder, pattern }) => (
              <div key={name}>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  <Icon className="w-4 h-4" /> {label}
                </label>
                <Input
                  {...register(`contact.${name}`, {
                    required: `${label} is required`,
                    pattern: pattern ? { value: pattern, message: `Invalid ${label}` } : undefined
                  })}
                  placeholder={placeholder}
                />
                {errors.contact?.[name] && (
                  <CardAction className="text-red-500 text-sm">
                    {errors.contact[name].message}
                  </CardAction>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
