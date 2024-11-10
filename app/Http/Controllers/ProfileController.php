<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Dashboard\UserController;
use App\Http\Requests\ProfileUpdateRequest;
use enshrined\svgSanitize\Sanitizer;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        // Fill validated data
        $user->fill($request->validated());

        // Check if email was modified
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Handle a possible base64 avatar
        if ($request->has('avatar')) {
            $base64Avatar = $request->input('avatar');

            // Regex to match data URI scheme for images, including svg+xml
            if (preg_match('/^data:image\/([a-zA-Z0-9\+\-\/]+);base64,/', $base64Avatar, $type)) {

                $base64Avatar = substr($base64Avatar, strpos($base64Avatar, ',') + 1);
                $mimeType = strtolower($type[1]);

                // Map the MIME type to an extension
                $extension = '';
                switch ($mimeType) {
                    case 'jpeg':
                    case 'jpg':
                        $extension = 'jpg';
                        break;
                    case 'png':
                        $extension = 'png';
                        break;
                    case 'gif':
                        $extension = 'gif';
                        break;
                    case 'svg+xml':
                        $extension = 'svg';
                        break;
                    default:
                        return back()->withErrors(['avatar' => 'Unsupported image type.']);
                }

                // Decode the base64 encoded data
                $avatarData = base64_decode($base64Avatar);

                // Sanitize SVG files
                if ($extension === 'svg') {
                    $sanitizer = new Sanitizer();
                    $sanitizedSVG = $sanitizer->sanitize($avatarData);
                    if ($sanitizedSVG === false) {
                        return back()->withErrors(['avatar' => 'Invalid or unsafe SVG file.']);
                    }
                    $avatarData = $sanitizedSVG;
                }

                $fileName = 'avatar_' . $user->id . '.' . $extension;
                Storage::disk('public')->put("images/avatar/{$fileName}", $avatarData);
                $user->avatar = "storage/images/avatar/{$fileName}";
            }
        }

        // Save the user
        $user->save();

        // Redirect back to profile edit with success message
        return Redirect::route('dashboard.profile.edit')->with('status', 'Profile updated successfully.');
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
