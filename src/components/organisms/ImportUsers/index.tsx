"use client";
import React, { useState, useRef } from "react";
import Papa from "papaparse";
import {
  BLOOD_GROUP,
  ORGANIZATION_ID,
  GENDER,
} from "@/utils/constants";
import FormMessage from "@/components/molecules/FormMessage";
import { importUsersAction } from "@/components/organisms/ImportUsers/action";
import { Button } from "@nextui-org/react";
import Table from "@/components/organisms/Table";

const ImportUsers = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      checkAndSetFile(e.target.files[0]);
    }
  };

  const checkAndSetFile = (file: File) => {
    setError(null);
    setParsedData([]);
    if (file.type !== "text/csv") {
      setError("Please upload a CSV file.");
      return;
    }
    setCsvFile(file);
  };

  const handleParse = () => {
    if (!csvFile) {
      setError("Please upload a CSV file.");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Remove blood_group and gender from each row
        const data = results.data.map((item: any) => ({
          ...item,
          blood_group_id: BLOOD_GROUP.find(
            (bg) =>
              bg.label.toLocaleLowerCase() ===
              item.blood_group.trim().toLocaleLowerCase()
          )?.value,
          gender_id: GENDER.find(
            (g) =>
              g.label.toLocaleLowerCase() ===
              item.gender.trim().toLocaleLowerCase()
          )?.value,
          bw_id: ORGANIZATION_ID,
          is_active: true,
        }));

        Object.entries(data).forEach(([, value]) => {
          delete value.blood_group;
          delete value.gender;
        });
        setParsedData(data);
        setError(null);
      },
      error: (err) => {
        setError(`Error parsing CSV file: ${err.message}`);
      },
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await importUsersAction(parsedData);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setParsedData([]);
    setCsvFile(null);
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <input
          className="hidden"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          aria-label="CSV File"
          ref={fileInputRef}
        />
        {parsedData.length === 0 && (
          <>
            <div
              className="flex flex-col justify-center items-center gap-2 text-center p-2
              h-[320px] max-h-[60vh] w-full border-dashed border-default-500 border-1 rounded-lg cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  checkAndSetFile(e.dataTransfer.files[0]);
                }
              }}
            >
              {!csvFile ? (
                <>
                  <span className="material-symbols-rounded text-default-500 text-4xl">
                    upload
                  </span>
                  <p className="text-sm">Click to upload or drag and drop</p>
                  <p className="text-xs text-default-400">CSV file only</p>
                </>
              ) : (
                <>
                  <span className="material-symbols-rounded text-4xl text-success">
                    check_circle
                  </span>
                  <p className="text-sm">
                    File uploaded successfully. Click display data to continue.
                  </p>
                  <p className="text-xs text-default-400">{csvFile?.name}</p>
                </>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleParse}
                color="primary"
                isDisabled={!csvFile}
              >
                Display data
              </Button>
            </div>
            {error && <FormMessage message={{ error }} />}
          </>
        )}
      </div>

      {parsedData.length > 0 && (
        <>
          <div className="flex justify-end gap-2 items-center">
            <p className="text-sm text-default-400">Want to change file?</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              startContent={
                <span className="material-symbols-rounded">upload</span>
              }
            >
              Browse File
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Table
              columns={
                parsedData[0]
                  ? Object.keys(parsedData[0]).map((key) => ({
                      key,
                      label: key.replace(/_/g, " ").toUpperCase(),
                    }))
                  : []
              }
              data={parsedData}
              itemsKey="name"
            />
            <div className="flex justify-end">
              <Button
                color="primary"
                onClick={handleSubmit}
                isLoading={loading}
              >
                Confirm and Import
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImportUsers;
