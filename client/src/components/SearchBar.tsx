import { Button, MenuItem, TextField } from "@mui/material";
import styles from "../styles/SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { productDetails } from "../models";
import * as api from "../apiControllers/productController";
import SingleSearchResult from "./SingleSearchResult";

const SearchBar: React.FC<{}> = () => {
    const [category, setCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("all");

    const [productDetails, setProductDetails] = useState<productDetails[]>();

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setCategory(value);
    };

    const getProductData = async () => {
        try {
            const data = await api.getProducts();
            if (data.error) {
                console.error("Fetch products failed: ", data.error);
            } else {
                setProductDetails(data.products);
                console.log("Products fetched successfully: ", data.products);
            }
        } catch (error) {
            console.error("Error retreiving products:", error);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <div className={styles.searchBarContainer}>
            <TextField
                variant="filled"
                select
                id="categoryPicker"
                className={styles.categorySelect}
                value={category}
                onChange={handleCategoryChange}
                hiddenLabel
            >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="sticker">Stickers</MenuItem>
                <MenuItem value="frames">Frames</MenuItem>
                <MenuItem value="pinsBadges">Pins and Badges</MenuItem>
            </TextField>

            <TextField
                className={styles.searchBar}
                inputProps={{
                    style: {
                        fontSize: 16,
                    },
                }}
                variant="filled"
                onChange={(event) => setSearchQuery(event.target.value)}
                hiddenLabel
            ></TextField>
            <Button
                aria-label="search"
                variant="contained"
                className={styles.searchButton}
            >
                <SearchIcon fontSize="large" />
            </Button>
            {searchQuery &&
                productDetails
                    ?.filter((product) => product.name.includes(searchQuery))
                    ?.map((product) => (
                        <SingleSearchResult key={product._id} {...product} />
                    ))}
        </div>
    );
};

export default SearchBar;
