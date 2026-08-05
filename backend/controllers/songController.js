import songService from "../services/songService.js";

import ApiResponse from "../utils/ApiResponse.js";

import asyncHandler from "../utils/asyncHandler.js";

class SongController {

    /*
    |--------------------------------------------------------------------------
    | Create Song
    |--------------------------------------------------------------------------
    */

 createSong = asyncHandler(async (req, res) => {

    const song = await songService.createSong(

        req.user._id,

        req.body,

        req.files

    );

    res.status(201).json(

        new ApiResponse(

            201,

            "Song uploaded successfully",

            song

        )

    );

});

    /*
    |--------------------------------------------------------------------------
    | Get My Songs
    |--------------------------------------------------------------------------
    */

    getMySongs = asyncHandler(async (req, res) => {

        const songs = await songService.getMySongs(

            req.user._id

        );

        res.status(200).json(

            new ApiResponse(

                200,

                "Songs fetched successfully",

                songs

            )

        );

    });

    /*
    |--------------------------------------------------------------------------
    | Get Song By ID
    |--------------------------------------------------------------------------
    */

    getSongById = asyncHandler(async (req, res) => {

        const song = await songService.getSongById(

            req.params.id

        );

        res.status(200).json(

            new ApiResponse(

                200,

                "Song fetched successfully",

                song

            )

        );

    });

    /*
    |--------------------------------------------------------------------------
    | Update Song
    |--------------------------------------------------------------------------
    */

    updateSong = asyncHandler(async (req, res) => {

        const song = await songService.updateSong(

            req.params.id,

            req.user._id,

            req.body

        );

        res.status(200).json(

            new ApiResponse(

                200,

                "Song updated successfully",

                song

            )

        );

    });

    /*
    |--------------------------------------------------------------------------
    | Delete Song
    |--------------------------------------------------------------------------
    */

    deleteSong = asyncHandler(async (req, res) => {

        await songService.deleteSong(

            req.params.id,

            req.user._id

        );

        res.status(200).json(

            new ApiResponse(

                200,

                "Song deleted successfully"

            )

        );

    });

    /*
    |--------------------------------------------------------------------------
    | Pending Songs
    |--------------------------------------------------------------------------
    */

    getPendingSongs = asyncHandler(async (req, res) => {

        const songs = await songService.getPendingSongs();

        res.status(200).json(

            new ApiResponse(

                200,

                "Pending songs fetched successfully",

                songs

            )

        );

    });

    /*
    |--------------------------------------------------------------------------
    | Approve Song
    |--------------------------------------------------------------------------
    */

    approveSong = asyncHandler(async (req, res) => {

        const song = await songService.approveSong(

            req.params.id,

            req.user._id

        );

        res.status(200).json(

            new ApiResponse(

                200,

                "Song approved successfully",

                song

            )

        );

    });

    /*
    |--------------------------------------------------------------------------
    | Reject Song
    |--------------------------------------------------------------------------
    */

    rejectSong = asyncHandler(async (req, res) => {

        const song = await songService.rejectSong(

            req.params.id,

            req.body.reason

        );

        res.status(200).json(

            new ApiResponse(

                200,

                "Song rejected successfully",

                song

            )

        );

    });

    /*
    |--------------------------------------------------------------------------
    | Block Song
    |--------------------------------------------------------------------------
    */

    blockSong = asyncHandler(async (req, res) => {

        const song = await songService.blockSong(

            req.params.id

        );

        res.status(200).json(

            new ApiResponse(

                200,

                "Song blocked successfully",

                song

            )

        );

    });
    /*
|--------------------------------------------------------------------------
| Get All Songs
|--------------------------------------------------------------------------
*/

getAllSongs = asyncHandler(async(req,res)=>{

    const songs = await songService.getAllSongs(

        req.query

    );

    res.status(200).json(

        new ApiResponse(

            200,

            "Songs fetched successfully",

            songs

        )

    );

});

}

export default new SongController();