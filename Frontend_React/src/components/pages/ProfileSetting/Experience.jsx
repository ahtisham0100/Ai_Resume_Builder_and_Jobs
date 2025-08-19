import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { Trash2, PlusCircle, Pencil, Save, Briefcase, User, Calendar } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useProfileInfo } from "@/contextProvider/ProfileContextProvider";
import { useState, useEffect } from "react";

export default function Experience() {
  const { profileInfo, setProfileInfo } = useProfileInfo();
  const [isEditing, setIsEditing] = useState(false);

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      experience: profileInfo?.experience || [],
    },
    mode: "onChange",
    reValidateMode: "onBlur"
  });

  const experienceArray = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data) => {
    const updated = { ...profileInfo, experience: data.experience };
    setProfileInfo(updated);
    localStorage.setItem("basicInfo", JSON.stringify(updated));
    setIsEditing(false);
  };

  useEffect(() => {
    reset({ experience: profileInfo?.experience || [] });
  }, [profileInfo, reset]);

  const fieldsMeta = [
    { key: "company", label: "Company", icon: Briefcase, placeholder: "Enter company" },
    { key: "role", label: "Role", icon: User, placeholder: "Enter role" },
    { key: "duration", label: "Duration", icon: Calendar, placeholder: "Enter duration" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Experience</CardTitle>
          {!isEditing ? (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </Button>
          ) : (
            <Button size="sm" onClick={handleSubmit(onSubmit)}>
              <Save className="w-4 h-4 mr-1" /> Save
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {!isEditing ? (
            <div className="space-y-3">
              {profileInfo?.experience?.length ? (
                profileInfo.experience.map((exp, idx) => (
                  <div key={idx} className="border rounded-lg p-3 bg-muted/30 space-y-1">
                    <p className="font-semibold flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-muted-foreground" /> {exp.company}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="w-4 h-4 text-muted-foreground" /> {exp.role}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" /> {exp.duration}
                    </p>
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground">No experience added yet</span>
              )}
            </div>
          ) : (
            <>
              {experienceArray.fields.map((field, index) => (
                <div key={field.id} className="grid gap-2 border p-3 rounded-lg">
                  {fieldsMeta.map(({ key, label, icon: Icon, placeholder }) => (
                    <div key={key}>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Icon className="w-4 h-4" /> {label}
                      </label>
                      <Input
                        {...register(`experience.${index}.${key}`, { required: `${label} is required` })}
                        placeholder={placeholder}
                      />
                      {errors.experience?.[index]?.[key] && (
                        <CardAction className="text-red-500 text-sm">
                          {errors.experience[index][key].message}
                        </CardAction>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => experienceArray.remove(index)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                className="flex items-center gap-2"
                onClick={() => experienceArray.append({ company: "", role: "", duration: "" })}
              >
                <PlusCircle className="w-4 h-4" /> Add Experience
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
