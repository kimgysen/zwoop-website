import {FC, useState} from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";


interface ReactMdeProps {
    description: string,
    setDescription: (description: string) => void
}

const ReactMdeEditor: FC<ReactMdeProps> = ({ description, setDescription }) => {
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const save = async function* (data: any) {
        // Promise that waits for "time" milliseconds
        const wait = function (time: number) {
            return new Promise((a: any, r) => {
                setTimeout(() => a(), time);
            });
        };

        // Upload "data" to your server
        // Use XMLHttpRequest.send to send a FormData object containing
        // "data"
        // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

        await wait(2000);
        // yields the URL that should be inserted in the markdown
        yield "https://picsum.photos/300";
        await wait(2000);

        // returns true meaning that the save was successful
        return true;
    };

    return (
        <div className="container">
            <ReactMde
                value={ description }
                onChange={ setDescription }
                selectedTab={ selectedTab }
                onTabChange={ setSelectedTab }
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                paste={{
                    saveImage: save
                }}

            />
        </div>
    );

}

export default ReactMdeEditor;
