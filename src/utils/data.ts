export const NAV_LINKS = [
    
   

      {
        to: "/",
        label: "Find parking",
        private: false,
        type: "link",
        className: "text-sm text-slate-600 font-medium py-1.5 hover:text-slate-600"
    },

       {
        to: "/private/reservation",
        label: "My reservations",
        private: true,
        type: "link",
        className: "text-sm text-slate-600 font-medium py-1.5 hover:text-slate-600"
    },
    
    {
        to: "/login",
        label: "Login",
        private: false,
        type: "link",
        className: "text-sm text-green-600 font-medium py-1.5 hover:text-green-800"
    },
     
    {
       to: "/signup",
       label: "Signup",
       private: false,
       type: "link",
       className: "rounded-full border border-green-600 font-medium text-green-600 text-sm px-4 p-1.5 hover:bg-green-50"
    },

     {
        to: "/",
        label: "AI Assistant",
        private: false,
        type: "action",
        action: "open-assistant",
        className: "rounded-full border border-green-600 font-medium text-green-600 text-sm px-4 p-1.5 hover:bg-green-50"
    },

    ]



