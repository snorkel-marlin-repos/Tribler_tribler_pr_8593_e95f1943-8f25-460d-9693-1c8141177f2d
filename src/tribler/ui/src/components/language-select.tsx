import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { triblerService } from "@/services/tribler.service";
import { isErrorDict } from "@/services/reporting";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { EasyTooltip } from "./ui/tooltip";


const LanguageSelect = () => {
    const [ language, setLanguage ] = useState<string>("");
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = triblerService.guiSettings.lang ?? 'en_US';
        setLanguage(lng);
        i18n.changeLanguage(lng);
    }, []);

    const changeLanguage = async (lng: string) => {
        setLanguage(lng);
        i18n.changeLanguage(lng);
        const response = await triblerService.setSettings({ ui: { lang: lng } });
        if (response === undefined) {
            toast.error(`${t("ToastErrorSetLanguage")} ${t("ToastErrorGenNetworkErr")}`);
        } else if (isErrorDict(response)) {
            toast.error(`${t("ToastErrorSetLanguage")} ${response.error.message}`);
        }
    };

    return (
        <DropdownMenu>
            <EasyTooltip content={t('SelectLanguage')}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        {language.slice(0, 2)}
                    </Button>
                </DropdownMenuTrigger>
            </EasyTooltip>
            <DropdownMenuContent align="end" className="min-w-[6rem]">
                <DropdownMenuItem onClick={() => changeLanguage('en_US')}>
                    en
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('es_ES')}>
                    es
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('hi_IN')}>
                    hi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ko_KR')}>
                    ko
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('pt_BR')}>
                    pt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ru_RU')}>
                    ru
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('zh_CN')}>
                    zh
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelect;
