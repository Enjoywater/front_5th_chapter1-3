import { useState } from "react";
import { memo, useCallback } from "../@lib";
import { renderLog } from "../utils";
import { useNotification } from "../@lib/context";

const PREFERENCES = ["독서", "운동", "음악", "여행"] as const;

const ComplexForm: React.FC = memo(() => {
  renderLog("ComplexForm rendered");

  const { addNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    preferences: [] as string[],
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      addNotification("폼이 성공적으로 제출되었습니다", "success");
    },
    [addNotification],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: name === "age" ? parseInt(value) || 0 : value,
      }));
    },
    [],
  );

  const handlePreferenceChange = useCallback((preference: string) => {
    setFormData((prev) => {
      const isIncludedPreference = prev.preferences.includes(preference);
      const filteredPreferences = prev.preferences.filter(
        (p) => p !== preference,
      );

      return {
        ...prev,
        preferences: isIncludedPreference
          ? filteredPreferences
          : [...prev.preferences, preference],
      };
    });
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="이름"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="이메일"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="나이"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />

        <div className="space-x-4">
          {PREFERENCES.map((preference) => {
            const isChecked = formData.preferences.includes(preference);

            return (
              <label key={preference} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handlePreferenceChange(preference)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">{preference}</span>
              </label>
            );
          })}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          제출
        </button>
      </form>
    </div>
  );
});

export default ComplexForm;
