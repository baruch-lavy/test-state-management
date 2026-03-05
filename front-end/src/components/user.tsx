import { UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { fetchUserData } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export function User() {
  const { setAddress, setFullName, setUsername, setAge, address, fullName, username, age } = useStore(
    useShallow((store) => ({
      setAddress: store.setAddress,
      setFullName: store.setFullName,
      setUsername: store.setUsername,
      setAge: store.setAge,
      address: store.address,
      fullName: store.fullName,
      username: store.username,
      age: store.age,
    })),
  );

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (user) {
    setFullName(user.fullName);
    setUsername(user.username);
    setAge(user.age);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <UserIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96">
        <div className="flex flex-col gap-2 items-center">
          <p>{fullName}</p>
          <p className="text-sm">{username}</p>
          <p className="text-sm">{age} years old</p>

          <Label htmlFor="address">Your Address:</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
