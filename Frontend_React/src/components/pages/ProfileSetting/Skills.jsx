import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { Trash2, PlusCircle, Pencil, Save, Star } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useProfileInfo } from "@/contextProvider/ProfileContextProvider";
import { useState, useEffect } from "react";

export default function Skills() {
  const { profileInfo, setProfileInfo } = useProfileInfo();
  const [isEditing, setIsEditing] = useState(false);

  const { control, register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      skills: profileInfo?.skills || [],
    },
    mode: "onChange", // live validation
  });

  const skillsArray = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = (data) => {
    const updated = { ...profileInfo, skills: data.skills };
    setProfileInfo(updated);
    localStorage.setItem("basicInfo", JSON.stringify(updated));
    setIsEditing(false);
  };

  useEffect(() => {
    reset({ skills: profileInfo?.skills || [] });
  }, [profileInfo, reset]);

  const watchSkills = watch("skills");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Skills</CardTitle>
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

        <CardContent className="space-y-3">
          {!isEditing ? (
            <div className="flex flex-wrap gap-2">
              {profileInfo?.skills?.length ? (
                profileInfo.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary flex items-center gap-1"
                  >
                    <Star className="w-4 h-4" /> {skill}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground">No skills added yet</span>
              )}
            </div>
          ) : (
            <>
              {skillsArray.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <div className="flex-1">
                    <label className="flex items-center gap-1 text-sm font-medium mb-1">
                      <Star className="w-4 h-4" /> Skill
                    </label>
                    <Input
                      {...register(`skills.${index}`, { 
                        required: "Skill is required",
                        validate: value => value.trim() !== "" || "Skill cannot be empty"
                      })}
                      placeholder="Enter skill"
                    />
                    {errors.skills?.[index] && (
                      <CardAction className="text-red-500 text-sm">
                        {errors.skills[index].message}
                      </CardAction>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => skillsArray.remove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => skillsArray.append("")}
                className="flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Add Skill
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
