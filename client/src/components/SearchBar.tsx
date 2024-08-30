import { Button, MenuItem, TextField } from "@mui/material";
import styles from "../styles/SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import { productDetails } from "../models";
import * as api from "../apiControllers/productController";
import SingleSearchResult from "./SingleSearchResult";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const SearchBar: React.FC<{}> = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("all");

    const [productDetails, setProductDetails] = useState<productDetails[]>();

    const categoryList = ["Stickers", "Frames", "Pins and Badges"];

    const handleCategorySelect = (
        event: SelectChangeEvent<typeof categories>
    ) => {
        const {
            target: { value },
        } = event;
        if (
            value.length === categoryList.length + 1 &&
            value.includes("Select All")
        ) {
            setCategories([]);
        } else if (value.includes("Select All")) {
            setCategories(categoryList);
        } else {
            setCategories(typeof value === "string" ? value.split(",") : value);
        }
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
        <div>
            <div className={styles.searchBanner}>
                <div className={styles.searchBarContainer}>
                    <FormControl className={styles.categorySelect}>
                        <InputLabel id="user-category-selection-prompt">
                            Category
                        </InputLabel>
                        <Select
                            labelId="user-category-selection-prompt"
                            multiple
                            value={categories}
                            onChange={handleCategorySelect}
                            input={<OutlinedInput label="Category" />}
                        >
                            <MenuItem value="Select All">Select All</MenuItem>
                            {categoryList.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        className={styles.searchEntry}
                        variant="filled"
                        placeholder="Search"
                        onChange={(event) => setSearchQuery(event.target.value)}
                        hiddenLabel
                    ></TextField>
                </div>
            </div>

            <div className={styles.empty}>
                <div className={styles.searchResultsContainer}>
                    {searchQuery &&
                        productDetails
                            ?.filter(
                                (product) =>
                                    product.name.includes(searchQuery) &&
                                    categories.includes(product.category)
                            )
                            ?.slice(0, 8)
                            .map((product) => (
                                <SingleSearchResult
                                    key={product._id}
                                    {...product}
                                />
                            ))}
                    <div className={styles.seeAllButton}>
                        <Button
                            className={styles.buttonText}
                            onClick={() => {
                                alert("functionality does not exist yet");
                            }}
                            aria-label="View All Search
                            Results"
                        >
                            View All Results &emsp;&emsp;
                            <SearchIcon
                                fontSize="large"
                                sx={{ color: "black" }}
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
