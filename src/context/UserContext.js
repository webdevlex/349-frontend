import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

	useEffect(() => {
		console.log("user context updating", user);
		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
}
