import { CustomFlowbiteTheme } from 'flowbite-react';

export const LongLorems = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
export const ShortLorems = "This project has to start ASAP make a me a better offer by bidding.";
export const NetworkTitle = "We Could Not Detect Internet Connection.";
export const NetworkMessage = "Please toogle or troubleshoot your internet connection.";


export const customTheme: CustomFlowbiteTheme['badge'] = {
    root: {
        color: {
            success: "bg-appGreen text-white font-thin"
        }
    }
};

export const TimeLimeIcon_Theme: CustomFlowbiteTheme['timeline'] = {
    item: {
        point: {
            marker: {
                icon: {
                    "base": "h-3 w-3 text-appGreen dark:text-appGreen",
                    wrapper: "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-black ring-8 ring-white dark:bg-black dark:ring-gray-900"
                }
            }
        }
    }
};

//success or submit button
export const customsubmitTheme: CustomFlowbiteTheme['button'] = {
    color: {
        appsuccess: "text-white hover:text-white bg-appGreen border border-transparent enabled:hover:bg-appGreen focus:ring-4 focus:ring-green-300 dark:bg-appGreen dark:enabled:hover:bg-black dark:focus:ring-appGreen",
        success: "text-white bg-appGreen border border-transparent enabled:hover:bg-appGreen focus:ring-4 focus:ring-green-300 dark:bg-appGreen dark:enabled:hover:bg-black dark:focus:ring-appGreen focus:border-appGreen",
        light: "border border-gray-300 bg-white text-gray-900 focus:ring-4 focus:ring-green-300 enabled:hover:bg-appGreen hover:text-white dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:focus:ring-green-300 dark:enabled:hover:border-gray-700 hover:text-white dark:enabled:hover:ring-green-300",
    }
};

//Checkbox  theme
export const customCheckboxTheme: CustomFlowbiteTheme['checkbox'] = {
    root: {
        color: {
            success: "focus:ring-appGreen dark:ring-appGreen dark:focus:ring-appGreen text-appGreen"
        }
    }
};
export const customInputBoxTheme: CustomFlowbiteTheme['textInput'] = {

    field: {
        input: {
            colors: { focuscolor: "bg-gray-50 border-gray-300 text-gray-900 focus:ring-appGreen focus:ring-appGreen dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-appGreen dark:focus:ring-appGreen focus:border-appGreen" }
        }
    }

};

export const customselectTheme: CustomFlowbiteTheme['select'] = {

    //come theme here
    field: {
        select: {
            colors: {
                success: "bg-gray-50 border-gray-300 text-gray-900 focus:ring-appGreen focus:ring-appGreen dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-appGreen dark:focus:ring-appGreen focus:border-appGreen"
            },
            withShadow: {
                on: "shadow-sm dark:shadow-sm-light"
            }
        }
    }
};