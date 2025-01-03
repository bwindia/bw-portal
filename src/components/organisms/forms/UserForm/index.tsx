"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Chip, DatePicker, Select, SelectItem } from "@nextui-org/react";
import { createClient } from "@/lib/supabase/client";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { userFormAction } from "@/components/organisms/forms/UserForm/actions";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { USERS_PAGE_ROUTE } from "@/utils/routes";
import { parseDate } from "@internationalized/date";
import Link from "next/link";
import { BLOOD_GROUP, GENDER } from "@/utils/constants";

interface UserFormProps {
  userData?: any;
}

const UserForm: React.FC<UserFormProps> = ({ userData }) => {
  const [state, formAction] = useFormState(userFormAction, undefined);
  const [roles, setRoles] = useState<any[]>([]);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch master data
      const [{ data: rolesData }] = await Promise.all([
        supabase.from("master_user_role").select("key: role_id, label: role"),
      ]);
      setRoles(rolesData || []);
    };

    fetchData();
  }, [supabase]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {userData?.user_id && (
        <input type="hidden" name="user_id" value={userData?.user_id} />
      )}

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Input
            type="text"
            label="Name"
            name="name"
            placeholder="Enter your name"
            labelPlacement="outside"
            variant="faded"
            defaultValue={userData?.name}
            isRequired
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            labelPlacement="outside"
            variant="faded"
            defaultValue={userData?.email}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Input
            type="tel"
            label="Mobile"
            name="mobile"
            placeholder="Enter your mobile number"
            labelPlacement="outside"
            variant="faded"
            defaultValue={userData?.mobile}
            isRequired
          />
        </div>
        <div className="w-full sm:w-1/2">
          <DatePicker
            showMonthAndYearPickers
            label="Date of Birth"
            name="date_of_birth"
            labelPlacement="outside"
            variant="faded"
            defaultValue={
              userData?.date_of_birth
                ? parseDate(userData?.date_of_birth)
                : undefined
            }
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Select
            label="Gender"
            name="gender_id"
            placeholder="Select your gender"
            labelPlacement="outside"
            variant="faded"
            defaultSelectedKeys={[userData?.gender_id?.toString()]}
          >
            {GENDER.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-full sm:w-1/2">
          <Select
            label="Blood Group"
            name="blood_group_id"
            placeholder="Select your blood group"
            labelPlacement="outside"
            variant="faded"
            defaultSelectedKeys={[userData?.blood_group_id?.toString()]}
            isRequired
          >
            {BLOOD_GROUP.map((bg) => (
              <SelectItem key={bg.value} value={bg.value}>
                {bg.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Input
            type="text"
            label="Pincode"
            name="pincode"
            placeholder="Enter your pincode"
            labelPlacement="outside"
            variant="faded"
            defaultValue={userData?.pincode}
            isRequired
          />
        </div>
        <div className="w-full sm:w-1/2">
          {roles.length > 0 && (
            <Select
              items={roles}
              label="Roles"
              name="roles"
              placeholder="Select your roles"
              labelPlacement="outside"
              variant="faded"
              selectionMode="multiple"
              defaultSelectedKeys={userData?.roles?.map((r: any) =>
                r.role_id.toString()
              )}
              renderValue={(items) => {
                return (
                  <div className="flex gap-1">
                    {items.map((item) => (
                      <Chip variant="bordered" key={item.key}>
                        {item.data.label}
                      </Chip>
                    ))}
                  </div>
                );
              }}
              isRequired
            >
              {(role) => (
                <SelectItem key={role.key} value={role.key}>
                  {role.label}
                </SelectItem>
              )}
            </Select>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2">
          <Select
            label="Active"
            name="active"
            placeholder="Select your active status"
            labelPlacement="outside"
            variant="faded"
            defaultSelectedKeys={[userData?.is_active?.toString()]}
          >
            <SelectItem key="true" value="true">
              Yes
            </SelectItem>
            <SelectItem key="false" value="false">
              No
            </SelectItem>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <div>
          <Button className="w-full sm:w-auto" variant="light" color="primary">
            <Link href={USERS_PAGE_ROUTE}>Cancel</Link>
          </Button>
        </div>
        <div>
          <FormSubmitButton errorMessage={state} pendingText="Saving User...">
            {userData?.user_id ? "Update User" : "Create User"}
          </FormSubmitButton>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
