import { useForm } from 'react-hook-form';
import { User, Mail, FileText, Pencil, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { useProfileInfo } from "@/contextProvider/ProfileContextProvider";
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useAuthProvider } from '@/contextProvider/AuthProvider';

const BasicInfo = () => {
  const { profileInfo, setProfileInfo } = useProfileInfo();
  const [isEditing, setIsEditing] = useState(!profileInfo?.basicInfo);
  const { user } = useAuthProvider();
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      basicInfo: profileInfo?.basicInfo || {
        name: '',
        email: user?.email || '',
        profileSummary: ''
      }
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const watchFields = watch('basicInfo');

  // Live sanitization: trim strings, sanitize for XSS
  useEffect(() => {
    Object.keys(watchFields).forEach(key => {
      let value = watchFields[key];
      if (typeof value === 'string') {
        value = DOMPurify.sanitize(value.trim());
        if (value !== watchFields[key]) {
          setValue(`basicInfo.${key}`, value, { shouldValidate: true });
        }
      }
    });
  }, [watchFields, setValue]);

  const onSubmit = (data) => {
    const sanitizedData = {
      basicInfo: {
        name: DOMPurify.sanitize(data.basicInfo.name.trim()),
        email: DOMPurify.sanitize(data.basicInfo.email.trim()),
        profileSummary: DOMPurify.sanitize(data.basicInfo.profileSummary.trim())
      }
    };
    const updated = { ...profileInfo, basicInfo: sanitizedData.basicInfo };
    setProfileInfo(updated);
    localStorage.setItem('basicInfo', JSON.stringify(updated));
    setIsEditing(false);
  };

  useEffect(() => {
    reset({
      basicInfo: profileInfo?.basicInfo || {
        name: '',
        email: user?.email,
        profileSummary: ''
      }
    });
  }, [profileInfo, reset]);

  const fields = [
    { 
      name: 'name', 
      label: 'Full Name', 
      icon: User, 
      placeholder: 'Enter your full name', 
      validation: { 
        required: 'Full name is required',
        maxLength: { value: 100, message: 'Name cannot exceed 100 characters' }
      }
    },
    { 
      name: 'email', 
      label: 'Email Address', 
      icon: Mail, 
      placeholder: user?.email || 'Enter your email address', 
      validation: { 
        required: 'Email address is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Invalid email address'
        },
        maxLength: { value: 255, message: 'Email cannot exceed 255 characters' }
      }
    },
    { 
      name: 'profileSummary', 
      label: 'Profile Summary', 
      icon: FileText, 
      placeholder: 'Tell us about yourself', 
      validation: { 
        required: 'Profile summary is required',
        maxLength: { value: 1000, message: 'Summary cannot exceed 1000 characters' }
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Basic Information</CardTitle>
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
                      {profileInfo?.basicInfo?.[name] || 'Not provided'}
                    </p>
                  </div>
                </div>
              ))}
              {!profileInfo?.basicInfo && (
                <span className="text-muted-foreground">No basic information added yet. Click "Edit" to add your details.</span>
              )}
            </div>
          ) : (
            fields.map(({ name, label, icon: Icon, placeholder, validation }) => (
              <div key={name}>
                <label 
                  htmlFor={`basicInfo-${name}`} 
                  className="flex items-center gap-2 text-sm font-medium mb-1"
                >
                  <Icon className="w-4 h-4" /> {label}
                </label>
                {name === 'profileSummary' ? (
                  <textarea
                    id={`basicInfo-${name}`}
                    {...register(`basicInfo.${name}`, validation)}
                    placeholder={placeholder}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    aria-invalid={errors.basicInfo?.[name] ? 'true' : 'false'}
                  />
                ) : (
                  <Input
                    id={`basicInfo-${name}`}
                    {...register(`basicInfo.${name}`, validation)}
                    placeholder={placeholder}
                    readOnly={name === 'email' && !!user?.email}
                    className={name === 'email' ? 'bg-gray-100 cursor-not-allowed' : ''}
                    aria-invalid={errors.basicInfo?.[name] ? 'true' : 'false'}
                  />
                )}
                {errors.basicInfo?.[name] && (
                  <CardAction className="text-red-500 text-sm">
                    {errors.basicInfo[name].message}
                  </CardAction>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfo;