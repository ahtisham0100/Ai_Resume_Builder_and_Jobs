import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { Trash2, PlusCircle, Pencil, Save, School, BookOpen, Calendar } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useProfileInfo } from "@/contextProvider/ProfileContextProvider";
import { useState, useEffect } from "react";

export default function Education() {
  const { profileInfo, setProfileInfo } = useProfileInfo();
  const [isEditing, setIsEditing] = useState(false);

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      education: profileInfo?.education || [],
    },
    mode: "onChange",
    reValidateMode: "onBlur"
  });

  const educationArray = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data) => {
    const updated = { ...profileInfo, education: data.education };
    setProfileInfo(updated);
    localStorage.setItem("basicInfo", JSON.stringify(updated));
    setIsEditing(false);
  };

  useEffect(() => {
    reset({ education: profileInfo?.education || [] });
  }, [profileInfo, reset]);

  const fieldsMeta = [
    { key: "institution", label: "Institution", icon: School, placeholder: "Enter institution" },
    { key: "degree", label: "Degree", icon: BookOpen, placeholder: "Enter degree" },
    { key: "year", label: "Year", icon: Calendar, placeholder: "Enter graduation year" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Education</CardTitle>
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
              {profileInfo?.education?.length ? (
                profileInfo.education.map((edu, idx) => (
                  <div key={idx} className="border rounded-lg p-3 bg-muted/30 space-y-1">
                    <p className="font-semibold flex items-center gap-1">
                      <School className="w-4 h-4 text-muted-foreground" /> {edu.institution}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-muted-foreground" /> {edu.degree}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" /> {edu.year}
                    </p>
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground">No education added yet</span>
              )}
            </div>
          ) : (
            <>
              {educationArray.fields.map((field, index) => (
                <div key={field.id} className="grid gap-2 border p-3 rounded-lg">
                  {fieldsMeta.map(({ key, label, icon: Icon, placeholder }) => (
                    <div key={key}>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Icon className="w-4 h-4" /> {label}
                      </label>
                      <Input
                        {...register(`education.${index}.${key}`, { required: `${label} is required` })}
                        placeholder={placeholder}
                      />
                      {errors.education?.[index]?.[key] && (
                        <CardAction className="text-red-500 text-sm">
                          {errors.education[index][key].message}
                        </CardAction>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => educationArray.remove(index)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                className="flex items-center gap-2"
                onClick={() => educationArray.append({ institution: "", degree: "", year: "" })}
              >
                <PlusCircle className="w-4 h-4" /> Add Education
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
